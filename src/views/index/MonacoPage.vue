<template>
  <div class="my-editor" id='js_editor'> </div>
</template>
<script setup>
import * as monaco from 'monaco-editor'
import beautify from "js-beautify";
import { onMounted } from 'vue';
import { beautifierConf } from '@/utils/index'
onMounted(() => {
  monaco.editor.create(document.getElementById('js_editor'), {
    value: str,
    theme: 'vs-dark',
    language: 'json',
    automaticLayout: true
  })
})
const a = {
  abc: 123
}
const str = beautify.js(JSON.stringify(a), beautifierConf.js);
</script>
<style scoped lang='scss'>
.my-editor {
  height: calc(100vh);
}
</style>
