<script lang="jsx">
import { h } from 'vue';
import render from '@/components/render/render.js'
import draggable from "vuedraggable";
import { reactive, ref } from 'vue';

const components = {
  itemBtns(item, list, index) {
    const { onCopyItem, onDeleteItem } = this.$attrs;
    return [<span class="drawing-item-icon drawing-item-copy" title='删除' onClick={e => { onCopyItem(item, list); e.stopPropagation(); }}>
      <el-icon >
        <CopyDocument />
      </el-icon>
    </span>, <span class="drawing-item-icon drawing-item-delete" title='删除' onClick={e => { onDeleteItem(index, list); e.stopPropagation(); }}>
      <el-icon >
        <Delete />
      </el-icon>
    </span>]
  }
}

const layouts = {
  colItem(item, list, index, validateForm) {
    const conf = item._config_;
    const { onActiveItem } = this.$attrs;
    const className = this.activeId === conf.formId ? 'drawing-item active-from-item' : 'drawing-item';
    const classNameItem = this.formConf.unFocusedComponentBorder ? ' unfocus-border' : '';
    const labelWidth = conf.showLabel ? conf.labelWidth ? conf.labelWidth + 'px' : '' : '0px';
    const label = conf.showLabel ? conf.label : '';
    let rules;
    if (conf.regList && conf.regList.length > 0) {
      if (Array.isArray(conf.defaultValue)) {
        rules = conf.regList.map(item => {
          const last = item.pattern.lastIndexOf('/');
          return {
            validator: (rule, value, callback) => {
              const reg = new RegExp(item.pattern.slice(1, last), item.pattern.slice(last + 1));
              value.every(item => reg.test(item)) ? callback() : callback(false);
            }, message: item.message, trigger: item.trigger
          };
        })
      } else {
        rules = conf.regList.map(item => {
          const last = item.pattern.lastIndexOf('/');
          return { pattern: new RegExp(item.pattern.slice(1, last), item.pattern.slice(last + 1)), message: item.message, trigger: item.trigger };
        })
      }

    }
    return <el-col onClick={e => { onActiveItem(item); e.stopPropagation(); }} class={className} span={conf.span}>
      <el-form-item for={"stopPropagation"} label={label} label-width={labelWidth}
        required={conf.required} class={classNameItem} rules={rules} prop={item._vModel_}>
        <render item={item} v-model={conf.defaultValue} validateForm={validateForm}></render>
      </el-form-item>
      {components.itemBtns.apply(this, arguments)}
    </el-col>
  },
  rowItem(item, list, index, validateForm) {
    const conf = item._config_;
    const className = this.activeId === conf.formId ? 'drawing-row-item active-from-item' : 'drawing-row-item';
    const { onActiveItem, onCopyItem, onDeleteItem } = this.$attrs;
    conf.children = conf.children || [];
    return <el-col span={conf.span}>
      <el-row class={className} onClick={e => { onActiveItem(item); e.stopPropagation(); }} >
        {/* <el-col span={6}>{JSON.stringify(conf.children)}</el-col> */}
        <span class="component-name">{conf.componentName}</span>
        <draggable list={conf.children} group="componentsGroup" item-key="row-component" class={item.type === 'flex' ? "drag-wrapper flex-drag-wrapper" : "drag-wrapper"}
          v-slots={{
            item: ({ element, index }) => {
              return <draggable-item currentItem={element} activeId={this.activeId} list={conf.children} index={index}
                onActiveItem={onActiveItem} onCopyItem={onCopyItem} onDeleteItem={onDeleteItem} formConf={this.formConf} ></draggable-item>
            }
          }
          } >
        </draggable>
        {components.itemBtns.apply(this, arguments)}
      </el-row>
    </el-col >
  }
}

export default {
  props: ['currentItem', 'activeId', 'list', 'index', 'formConf', 'validateForm'],
  name: 'draggableItem',
  render(context) {
    // return <h1>text</h1>
    // return h('el-button', {}, this.conf._config_.tag)
    return layouts[context.currentItem._config_.layout].call(context, context.currentItem, context.list, context.index, context.validateForm);
  }
}
</script>
