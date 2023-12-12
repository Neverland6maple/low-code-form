<script lang="jsx">
import { h } from 'vue';
import render from '@/components/render/render.js'
import draggable from "vuedraggable";
import { reactive } from 'vue';
const layouts = {
  colItem(item) {
    const conf = item._config_;
    const { onActiveItem } = this.$attrs;
    const className = this.activeId === conf.formId ? 'drawing-item active-from-item' : 'drawing-item';
    return <el-col onClick={e => { onActiveItem(item); e.stopPropagation(); }} class={className} span={conf.span}>
      <el-form-item for={"stopPropagation"} label={conf.label}>
        <render conf={conf}></render>
      </el-form-item>
    </el-col>
  },
  rowItem(item) {
    const conf = item._config_;
    const className = this.activeId === conf.formId ? 'drawing-row-item active-from-item' : 'drawing-row-item';
    const { onActiveItem } = this.$attrs;
    conf.children = conf.children || [];
    const arr = reactive([]);
    return <el-col span={conf.span}>
      <el-row class={className} onClick={e => { onActiveItem(item); e.stopPropagation(); }} >
        {/* <el-col span={6}>{JSON.stringify(conf.children)}</el-col> */}
        <span class="component-name">{conf.componentName}</span>
        <draggable list={conf.children} group="componentsGroup" item-key="row-component" class="drag-wrapper"
          style={{ display: item.type === 'flex' ? 'flex' : '' }}
          v-slots={{
            item: ({ element, index }) => {
              return <draggable-item currentItem={element} onActiveItem={onActiveItem} activeId={this.activeId}></draggable-item>
            },
            default: () => { return null }
          }
          } >
        </draggable>
      </el-row>
    </el-col >
  }
}
function renderChildren(children) {
  if (!Array.isArray(children)) return null;
  return children.map((el, index) => {
    // return layouts[el._config_.layout].call(this, context.conf)
    return <draggable-item currentItem={el}></draggable-item>
  })
}
export default {
  props: ['currentItem', 'activeId'],
  name: 'draggableItem',
  render(context) {
    // return <h1>text</h1>
    // return h('el-button', {}, this.conf._config_.tag)
    return layouts[context.currentItem._config_.layout].call(context, context.currentItem);
  }
}
</script>
