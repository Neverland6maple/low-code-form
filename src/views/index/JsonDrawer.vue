<template>
  <div>
    <el-drawer direction="rtl" :before-close="handleClose" @open="onOpen" v-bind="$attrs" :show-close="false"
      :with-header="false">
      <div class="action-bar">
        <el-button text icon="view" @click="refresh">
          刷新
        </el-button>
        <el-button text icon="view" class="copy-btn">
          复制JSON
        </el-button>
        <el-button text icon="view">
          导出JSON文件
        </el-button>
        <el-button text icon="circle-close" @click="handleClose" style="color: #f56c6c;">
          关闭
        </el-button>
      </div>
      <div class="my-editor" id='js_editor'> </div>
    </el-drawer>
  </div>
</template>
<script setup>
import { useAttrs, ref, computed, watch, defineEmits, defineProps, toRaw, nextTick, onMounted } from 'vue'
import * as monaco from 'monaco-editor'
import beautify from "js-beautify";
import { beautifierConf } from '@/utils/index'
import ClipboardJS from 'clipboard'
import { ElNotification } from 'element-plus'
const copyBtn = ref(null)
const attrs = useAttrs()
const emit = defineEmits(['update:modelValue', 'refresh'])
const props = defineProps(['jsonStr'])
const jsonEditor = ref(null)
const beautifierJson = ref('')
let clipboard;
const onOpen = () => {
  if (!clipboard) {
    const clipboard = new ClipboardJS(document.querySelector('.copy-btn'), {
      text: trigger => {
        ElNotification({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        })
        return beautifierJson.value;
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

  beautifierJson.value = beautify.js(props.jsonStr, beautifierConf.js);
  if (!jsonEditor.value) {
    jsonEditor.value = monaco.editor.create(document.getElementById('js_editor'), {
      value: beautifierJson.value,
      theme: 'vs-dark',
      language: 'json',
      automaticLayout: true
    })
  } else {
    toRaw(jsonEditor.value).setValue(beautifierJson.value);
  }
}
const handleClose = () => {
  emit('update:modelValue', false)
}
const refresh = () => {
  emit('refresh', toRaw(jsonEditor.value).getValue())
}
onMounted(() => {


})

</script>
<style scoped lang='scss'>
.abv {
  color: red;
}

.my-editor {
  height: calc(100vh - 42px)
}

:deep(.el-drawer) {
  width: 50%;

  .el-drawer__body {
    padding: 0 !important;
  }
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
