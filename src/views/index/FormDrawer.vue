<template>
  <div>
    <el-drawer v-bind="$attrs" :with-header="false" @open="onOpen" @close="onClose">
      <el-row style="height:100%;">
        <el-col :md="24" :lg="12">
          <el-tabs type="card" class="editor-tabs" v-model="activeTab">
            <el-tab-pane name="template">
              <template #label>
                <el-icon>
                  <Edit />
                </el-icon>
                template
              </template>
            </el-tab-pane>
            <el-tab-pane name="script">
              <template #label>
                <el-icon>
                  <Document />
                </el-icon>
                script
              </template>
            </el-tab-pane>
            <el-tab-pane name="css">
              <template #label>
                <el-icon>
                  <Document />
                </el-icon>
                css
              </template>
            </el-tab-pane>
          </el-tabs>
          <div v-show="activeTab === 'template'" id="editorHtml" class="tab-editor" />
          <div v-show="activeTab === 'script'" id="editorJs" class="tab-editor" />
          <div v-show="activeTab === 'css'" id="editorCss" class="tab-editor" />
        </el-col>
        <el-col :md="24" :lg="12" style="overflow: hidden;height:100vh;">
          <div class="action-bar">
            <el-button text icon="view" @click="runCode">
              刷新
            </el-button>
            <el-button text icon="view" @click="exportFile">
              导出vue文件
            </el-button>
            <el-button text icon="view" class="copy-btn">
              复制代码
            </el-button>
            <el-button text icon="circle-close" @click="$emit('update:modelValue', false)" style="color: #f56c6c;">
              关闭
            </el-button>
          </div>
          <iframe src="preview.html" class="result-wrapper" frameborder="0" ref="previewPage" @load="iframeLoad"></iframe>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>
<script setup>
import { defineOptions, reactive, defineEmits, ref, toRaw, defineProps, onMounted, getCurrentInstance } from 'vue';
import * as monaco from 'monaco-editor'
import beautify from "js-beautify";
import { beautifierConf } from '@/utils/index'
import ClipboardJS from 'clipboard'
import { ElNotification } from 'element-plus'
import { makeUpHtml, vueTemplate, vueScript, cssStyle } from '@/components/generator/html'
import { makeUpJs } from '@/components/generator/js'
import { makeUpCss } from '@/components/generator/css'
import { saveAs } from 'file-saver'
const { proxy } = getCurrentInstance();
const props = defineProps(['formData', 'generateConf']);
const activeTab = ref('template')
const editorObj = reactive({
  html: null,
  js: null,
  css: null
})
const htmlCode = ref('')
const jsCode = ref('')
const cssCode = ref('')
const isInitcode = ref(false);
let clipboard;
defineOptions({ inheritAttrs: false });
const emit = defineEmits('')
const previewPage = ref(null)
const iframeLoad = () => {
  if (isInitcode.value) return;
  runCode();
  isInitcode.value = true;
}
const runCode = () => {
  const postData = {
    type: 'refreshFrame',
    data: {
      html: toRaw(editorObj.html).getValue(),
      js: toRaw(editorObj.js).getValue().replace('export default ', ''),
      css: toRaw(editorObj.css).getValue(),
      generateConf: JSON.stringify(props.generateConf)
    }
  }
  previewPage.value.contentWindow.postMessage(postData, location.origin)
}
const setEditorValue = (type, id, lang, code) => {
  if (!editorObj[type]) {
    editorObj[type] = monaco.editor.create(document.getElementById(id), {
      value: code,
      theme: 'vs-dark',
      language: lang,
      automaticLayout: true
    })
  } else {
    toRaw(editorObj[type]).setValue(code);
  }
}
const generateCode = () => {
  const html = vueTemplate(toRaw(editorObj.html).getValue());
  const js = vueScript(toRaw(editorObj.js).getValue());
  const css = cssStyle(toRaw(editorObj.css).getValue());
  return beautify.html(html + js + css, beautifierConf.html);
}
const onOpen = () => {
  if (!clipboard) {
    const clipboard = new ClipboardJS(document.querySelector('.copy-btn'), {
      text: trigger => {
        ElNotification({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        })
        return generateCode();
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
  const { type } = props.generateConf;
  htmlCode.value = makeUpHtml(props.formData, type)
  jsCode.value = makeUpJs(props.formData, type);
  cssCode.value = cssStyle(makeUpCss(props.formData));

  htmlCode.value = beautify.html(htmlCode.value, beautifierConf.html);
  jsCode.value = beautify.js(jsCode.value, beautifierConf.js);
  cssCode.value = beautify.css(cssCode.value, beautifierConf.html);

  setEditorValue('html', 'editorHtml', 'html', htmlCode.value)
  setEditorValue('js', 'editorJs', 'javascript', jsCode.value)
  setEditorValue('css', 'editorCss', 'html', cssCode.value)

  if (isInitcode.value) {
    runCode();
  }
}
const onClose = () => {
  // isInitcode.value = false;
}
const exportFile = () => {
  proxy.$prompt('文件名：', '导出文件', {
    closeOnClickModal: false,
    inputPlaceholder: '请输入文件名',
    inputValue: `${+ new Date()}.vue`,
    callback: (value) => {
      if (value.action === 'confirm') {
        const codeStr = generateCode();
        const blob = new Blob([codeStr], { type: 'text/plain;charset=urf-8' });
        saveAs(blob, value.value)
      }
    }
  })
  // .then((value) => {
  //   console.log(value);
  // })
}
</script>
<style scoped lang='scss'>
.result-wrapper {
  height: calc(100vh - 42px);
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
}

.tab-editor {
  height: calc(100vh - 42px);
}

:deep(.editor-tabs) {
  height: 42px;
  background-color: #121315;

  .el-tabs__header {
    border: none;
  }

  .el-tabs__nav {
    border: none;
  }

  .el-tabs__item {
    border: none;
    color: #888a8e;
    margin-right: 5px;
    background-color: #363636;

    .el-icon {
      color: #a95812;
      margin-right: 3px;
    }

    &.is-active {
      background-color: #1e1e1e;
      color: #fff;

      .el-icon {
        color: #f1fa8c;
      }
    }
  }
}

:deep(.el-drawer__body) {
  padding: 0;
}

.action-bar {
  height: 42px;
  padding: 0 15px;
  background-color: #f2fafb;
  line-height: 42px;

  .el-button {
    color: #8285f5;

    :deep(.el-icon) {
      font-size: 20px;
      transform: translateY(-1px);
    }
  }
}
</style>
