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
                <div class="component-item" @click="addComponent(element)">
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
      <div class="top-bar">
        <div class="user-bar">
          <el-button @click="toSquare">123</el-button>
        </div>
        <div class="action-bar">
          <el-button text icon="VideoPlay" @click="run">
            运行
          </el-button>
          <el-button text icon="view" @click="showJson">
            查看JSON
          </el-button>
          <el-button text icon="Download" @click="download">
            导出vue文件
          </el-button>
          <el-button text icon="DocumentCopy" @click="copy">
            复制代码
            <input id="copyNode" type="hidden">
          </el-button>
          <el-button text icon="Delete" @click="empty" style="color: #F56C6C;">
            清空
          </el-button>
        </div>
      </div>

      <el-scrollbar class="center-scrollbar">
        {{ validateForm }}
        <el-row class="center-board-row" :gutter="formConf.gutter">
          <el-form class="center-board-form" :model="validateForm" :size="formConf.size"
            :label-position="formConf.labelPosition" :disabled="formConf.disabled" :label-width="formConf.labelWidth">
            <draggable class="drawing-board" :list="drawingList" group="componentsGroup" item-key="center-components"
              :animation="340">
              <template #item="{ element, index }">
                <draggable-item :currentItem="element" :index="index" :activeId="activeId" :list="drawingList"
                  @activeItem="activeFormItem" @copyItem="copyItem" @deleteItem="deleteItem" :formConf="formConf"
                  :validateForm="validateForm" />
              </template>
            </draggable>
            <div class="empty-info" v-if="!drawingList.length">
              从左侧拖入或点选组件进行表单设计
            </div>
          </el-form>
        </el-row>
      </el-scrollbar>

    </div>
    <RightPanel :activeData="activeData" :showField="!!drawingList.length" :formConf="formConf" @tag-change="tagChange">
    </RightPanel>
    <FormDrawer :generateConf="generateConf" v-model="drawerVisible" size="100%" :form-data="formData"></FormDrawer>
    <JsonDrawer size="60%" :jsonStr="JSON.stringify(formData)" v-model="jsonDrawerVisible" @refresh="refreshJson">
    </JsonDrawer>
    <CodeTypeDialog v-model="dialogVisible" :show-file-name="showFileName" title="选择生产类型" @confirm="generate">
    </CodeTypeDialog>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick, watch, toRaw } from 'vue'
import draggable from "vuedraggable";
import RightPanel from './RightPanel.vue';
import DraggableItem from './DraggableItem'
import { inputComponents, layoutComponents, selectComponents, formConf as tempFormConf } from '@/components/generator/config.js'
import { deepClone } from '@/utils/index'
import { getIdGlobal, setDrawingList, getDrawingList, getFormData, setValidateForm, getValidateForm } from '@/utils/db'
import { ElNotification, ElMessageBox } from 'element-plus'
import JsonDrawer from './JsonDrawer.vue';
import CodeTypeDialog from './CodeTypeDialog.vue';
import FormDrawer from './FormDrawer.vue';
import { makeUpHtml, vueTemplate, vueScript, cssStyle } from '@/components/generator/html';
import { makeUpJs } from '@/components/generator/js';
import { makeUpCss } from '@/components/generator/css';
import beautify from "js-beautify";
import { beautifierConf } from '@/utils/index';
import { saveAs } from 'file-saver'
import ClipboardJS from 'clipboard'

let clipboard;
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
const drawingList = reactive(getDrawingList());
const generateConf = ref(null);
const dialogVisible = ref(false);
const showFileName = ref(false);
const formData = ref(null);
const validateForm = reactive(getValidateForm());
const formConf = ref(getFormData() || tempFormConf);
const tempActiveData = ref({});
const activeData = ref(drawingList[0] || { _config_: { formId: null }, _slot_: {} });
const activeId = ref(activeData.value._config_.formId);
const drawerVisible = ref(false);
const jsonDrawerVisible = ref(false);
const operationType = ref('');
const onEnd = (obj) => {
  if (obj.from !== obj.to) {
    activeData.value = tempActiveData.value;
    activeId.value = tempActiveData.value._config_.formId;
    if (tempActiveData.value._config_.layout !== 'rowItem') {
      validateForm[tempActiveData.value._vModel_] = tempActiveData.value._config_.defaultValue;
    }
  }
}
const addComponent = (item) => {
  const clone = cloneComponent(item);
  drawingList.push(clone);
  activeFormItem(clone);
  if (clone._config_.layout !== 'rowItem') {
    validateForm[tempActiveData.value._vModel_] = tempActiveData.value._config_.defaultValue;
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
  config.formId = +new Date() + '';
  config.renderKey = `${config.formId}${+new Date()}`;
  if (config.layout === 'colItem') {
    item._vModel_ = `field${config.formId}`;
  } else if (config.layout === 'rowItem') {
    config.componentName = `row${config.formId}`;
    !Array.isArray(config.children) && (config.children = []);
    delete config.label
  }
  if (config.children) {
    config.children.forEach((item) => {
      createIdAndKey(item);
    })
  }
  return item;
}
const activeFormItem = (item) => {
  activeData.value = item;
  activeId.value = item._config_.formId;
}
const copyItem = (item, list) => {
  const clone = cloneComponent(item);
  activeFormItem(clone);
  list.push(clone);
  if (clone._config_.layout !== 'rowItem') {
    validateForm[clone._vModel_] = clone._config_.defaultValue;
  }
}
const deleteItem = (index, list) => {
  const item = list.splice(index, 1)[0]
  delete validateForm[item._vModel_];
  if (list.length) {
    activeFormItem(list.at(-1));
  } else if (drawingList.length) {
    activeFormItem(drawingList.at(-1));
  }
}
const assembleFormData = () => {
  formData.value = Object.assign({ fields: deepClone(drawingList) }, formConf.value);
}
const showJson = () => {
  assembleFormData();
  jsonDrawerVisible.value = true;
}
const refreshJson = (json) => {
  try {
    const { fields, ...obj } = JSON.parse(json);
    drawingList.length = 0;
    drawingList.push(...fields);
    formConf.value = obj;
  } catch {
    ElNotification({
      title: '错误',
      message: 'JSON格式错误，请检查',
      type: 'error'
    })
  }
}
const tagChange = (target) => {
  // activeData.value._config_.tag = target._config_.tag;
  // activeData.value._config_.type = target._config_.type;

  const newTag = cloneComponent(target);
  newTag._config_.formId = activeData.value._config_.formId;
  newTag._vModel_ = activeData.value._vModel_;
  console.log(newTag);

  Object.keys(toRaw(activeData.value)).forEach(key => {
    if (!key.startsWith('_') && newTag[key] !== undefined) {
      newTag[key] = activeData.value[key]
    }
  })
  activeFormItem(newTag);
  updateDrawingList(newTag, drawingList)
}
const updateDrawingList = (item, list) => {
  const index = list.findIndex(el => el._config_.formId === item._config_.formId)
  if (index > -1) {
    list.splice(index, 1, item);
  } else {
    list.forEach(el => {
      if (el.children !== undefined) {
        updateDrawingList(item, el.children)
      }
    })
  }
}
const generateCode = (formData, type) => {
  const html = vueTemplate(makeUpHtml(formData, type));
  const js = vueScript(makeUpJs(formData, type));
  const css = cssStyle(makeUpCss(formData));
  return beautify.html(html + js + css, beautifierConf.html);
}
const execObj = {
  execrun: (data) => {
    assembleFormData();
    generateConf.value = data;
    drawerVisible.value = true;
  },
  execdownload: (data) => {
    assembleFormData();
    generateConf.value = data;
    const codeStr = generateCode(formData.value, data.type);
    const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, data.fileName)
  },
  execcopy: (data) => {
    assembleFormData();
    generateConf.value = data;
    document.querySelector('#copyNode').click();
  }
}
const run = () => {
  dialogVisible.value = true;
  showFileName.value = false;
  operationType.value = 'run';
}
const download = () => {
  dialogVisible.value = true;
  showFileName.value = true;
  operationType.value = 'download';
}
const copy = () => {
  dialogVisible.value = true;
  showFileName.value = false;
  operationType.value = 'copy';
}
const empty = () => {
  ElMessageBox.confirm(
    '确定要清空所有组件吗？',
    '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then((res) => {
    drawingList.length = 0;
    Object.keys(validateForm).forEach(item => {
      delete validateForm[item];
    })
  }).catch(() => { })
}
const generate = (data) => {
  const fnc = execObj[`exec${operationType.value}`];
  fnc && fnc(data)
}
const toSquare = () => {
  location.href = 'http://localhost:8080/square/#/';
}
onMounted(() => {
  if (!clipboard) {
    const clipboard = new ClipboardJS(document.querySelector('#copyNode'), {
      text: trigger => {
        ElNotification({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        })
        return generateCode(formData.value, generateConf.value.type);
      }
    })
    clipboard.on('error', () => {
      ElNotification({
        title: '失败',
        message: '代码复制失败',
        type: 'error'
      })
    })
  }
})
watch(drawingList, (val) => {
  setDrawingList(val);
}, {
  deep: true
})
watch(validateForm, (val) => {
  setValidateForm(val);
}, {
  deep: true
})
</script>
<style lang='scss' scoped>
@import '@/styles/home.scss';
</style>
