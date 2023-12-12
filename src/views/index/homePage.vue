<template>
  <div class="contanier">
    <div class="left-board">
      <div class="loao-wrapper">
        <div class="logo">
          LOW CODE FORM
        </div>
      </div>
      <el-scrollbar class="left-scrollbar">
        <div class="component-list">
          <div v-for="(item) in leftComponents" :key="item.title">
            <div class="component-title">
              <svg-icon icon-class="component" />
              {{ item.title }}
            </div>
            <draggable class="components-draggable" :list="item.list" draggable=".component-item" :sort="false"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }" item-key="left-components" @end="onEnd"
              :clone="cloneComponent">
              <template #item="{ element }">
                <div class="component-item">
                  <div class="component-body">
                    <svg-icon :icon-class="element._config_.tagIcon"></svg-icon>
                    <span class="component-label">{{ element._config_.label }}</span>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="center-board">
      <div class="action-bar">
        <el-button text icon="view" @click="showJson">
          查看JSON
        </el-button>
        <el-button plain icon="view">
          查看JSON
        </el-button>
      </div>
      <el-scrollbar class="center-scrollbar">
        <el-row class="center-board-row" :gutter="formConf.gutter">
          <el-form class="center-board-form" :size="formConf.size" :label-positon="formConf.labelPosition"
            :disabled="formConf.disabled" :label-width="formConf.labelWidth + 'px'">
            <draggable class="drawing-board" :list="drawingList" group="componentsGroup" item-key="center-components"
              :animation="340">
              <template #item="{ element }">
                <draggable-item :currentItem="element" :activeId="activeId" @activeItem="activeFormItem" />
              </template>
              <template>
                123
              </template>
            </draggable>
            <div class="empty-info" v-if="!drawingList.length">
              从左侧拖入或点选组件进行表单设计
            </div>
          </el-form>
        </el-row>
      </el-scrollbar>

    </div>
    <RightPanel :activeData="activeData" :showField="!!drawingList.length" :formConf="formConf"></RightPanel>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import draggable from "vuedraggable";
import RightPanel from './RightPanel.vue';
import DraggableItem from './DraggableItem'
import { inputComponents, layoutComponents, selectComponents, formConf as tempFormConf } from '@/components/generator/config.js'
import { deepClone } from '@/utils/index'
import { getIdGlobal } from '@/utils/db'
// import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue';
const leftComponents = reactive([{
  title: '输入型组件',
  list: inputComponents
}, {
  title: '选择性组件',
  list: selectComponents
}, {
  title: '布局型组件',
  list: layoutComponents
}])
const formData = ref(null);
const a = ref({ size: 'default' })
const formConf = ref(tempFormConf);
const tempActiveData = ref({});
const activeData = ref({ _config_: { label: '' } });
const activeId = ref(null);
const idGlobal = ref(getIdGlobal());
const arr = reactive([{ level: 1, context: 'fuck you' },
{ level: 2, context: 'you' },
{ level: 3, context: 'damn!' }]);
const drawingList = reactive([]);
const onEnd = (obj) => {
  if (obj.from !== obj.to) {
    activeData.value = tempActiveData.value;
    activeId.value = tempActiveData.value._config_.formId;
  }
}
const cloneComponent = (item) => {
  const clone = deepClone(item);
  const config = clone._config_;
  config.span = formConf.value.span;
  createIdAndKey(clone);
  tempActiveData.value = clone;
  return tempActiveData.value;
}
const createIdAndKey = (item) => {
  const config = item._config_;
  config.formId = idGlobal.value++;
  config.renderKey = `${config.formId}${+new Date()}`;
  if (config.layout === 'colItem') {
    config._vModel_ = `field${config.formId}`;
  } else if (config.layout === 'rowItem') {
    config.componentName = `row${config.formId}`;
  }

  return item;
}
const activeFormItem = (item) => {
  activeData.value = item;
  activeId.value = item._config_.formId;
}

const assembleFormData = () => {
  formData.value = Object.assign({ fields: deepClone(drawingList) }, formConf.value);
  console.log(formData.value);
}
const showJson = () => {
  assembleFormData()
}

</script>
<style lang='scss' scoped>
@import '@/styles/home.scss';
</style>
