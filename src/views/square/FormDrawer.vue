<template>
  <div>
    <el-drawer v-bind="$attrs" :with-header="false" @open="onOpen" @close="onClose">
      <el-row style="height:100%;">
        <el-col :span="12">
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
        <el-col :span="12" style="overflow: hidden;height:100vh;">
          <div class="action-bar">
            <el-button text :icon="Edit" @click="runCode">
              应用到编辑
            </el-button>
            <el-button text :icon="CircleClose" @click="$emit('update:modelValue', false)" style="color: #f56c6c;">
              关闭
            </el-button>
          </div>
          <div class="article">
            <section class="art-title">
              <div class="art-title-head">
                <div class="caption">{{ detailObj.title }}</div>
                <div class="art-title-census">
                  <div class="census-left">
                    <div class="viewcount"><span>阅读量: </span><span class="quanity">694</span></div>
                  </div>
                  <div class="census-right">
                    <div class="collectcount"><el-icon color="#999999" size="30">
                        <StarFilled />
                      </el-icon><span>0</span></div>
                    <div class="sharecount"><el-icon color="#999999" size="30">
                        <Share />
                      </el-icon><span class="Jba_num">分享</span></div>
                  </div>
                </div>
              </div>
            </section>
            <section id="article-content">
              <div id="article-up" class="article-up">
                <a href="/u/74763919.aspx" target="_blank">
                  <div
                    style="background-image:url(https://tx-free-imgs.acfun.cn/newUpload/74763919_2a41395745e243988b83cd16da9d08ab.png?imageMogr2/auto-orient/format/webp/quality/80!/ignore-error/1)"
                    class="up-cover live-avatar"></div>
                </a>
                <div class="up-abstract">
                  <div class="up-name">
                    <a href="/u/74763919.aspx" style="" target="_blank" class="upname">{{ detailObj.author }}</a>
                    <!-- <div class="up-type">创作者</div> -->
                  </div>
                  <div class="up-time">{{ detailObj.date }}</div>
                </div>
                <div class="article-content">
                  {{ detailObj.content }}
                </div>
                <div class="article-operation">
                  <div class="collectcount"><el-icon color="#999999" size="30">
                      <StarFilled />
                    </el-icon><span>0</span></div>
                  <div class="sharecount"><el-icon color="#999999" size="30">
                      <Share />
                    </el-icon><span class="Jba_num">分享</span></div>
                </div>
                <div class="bd_tag">
                  <span class="tag-single" v-for="(tag, index) in detailObj.tags" :key="index">
                    <a href="/search?keyword=生活" data-tid="201" target="_blank" class="fl">{{ tag }}</a>
                  </span>
                </div>
              </div>
            </section>
          </div>
          <!-- <iframe src="preview.html" class="result-wrapper" frameborder="0" ref="previewPage" @load="iframeLoad"></iframe> -->
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>
<script setup>
import { defineOptions, reactive, defineEmits, ref, toRaw, defineProps, getCurrentInstance } from 'vue';
import * as monaco from 'monaco-editor'
import beautify from "js-beautify";
import { beautifierConf } from '@/utils/index'
import ClipboardJS from 'clipboard'
import { ElNotification } from 'element-plus'
import { makeUpHtml, vueTemplate, vueScript, cssStyle } from '@/components/generator/html'
import { makeUpJs } from '@/components/generator/js'
import { makeUpCss } from '@/components/generator/css'
import { saveAs } from 'file-saver';
import { StarFilled, Share, Edit, Document, CircleClose } from '@element-plus/icons-vue'
const { proxy } = getCurrentInstance();
defineOptions({ inheritAttrs: false });
const props = defineProps(['generateConf', 'detailObj']);
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
  // if (!clipboard) {
  //   const clipboard = new ClipboardJS(document.querySelector('.copy-btn'), {
  //     text: trigger => {
  //       ElNotification({
  //         title: '成功',
  //         message: '代码已复制到剪切板，可粘贴。',
  //         type: 'success'
  //       })
  //       return generateCode();
  //     }
  //   })
  //   clipboard.on('error', () => {
  //     ElNotification({
  //       title: '失败',
  //       message: '代码复制失败',
  //       type: 'error'
  //     })
  //   })
  // }
  // const { type } = props.generateConf;
  // htmlCode.value = makeUpHtml(props.formData, type)
  // jsCode.value = makeUpJs(props.formData, type);
  // cssCode.value = cssStyle(makeUpCss(props.formData));

  // htmlCode.value = beautify.html(htmlCode.value, beautifierConf.html);
  // jsCode.value = beautify.js(jsCode.value, beautifierConf.js);
  // cssCode.value = beautify.css(cssCode.value, beautifierConf.html);

  // setEditorValue('html', 'editorHtml', 'html', htmlCode.value)
  // setEditorValue('js', 'editorJs', 'javascript', jsCode.value)
  // setEditorValue('css', 'editorCss', 'html', cssCode.value)

  // if (isInitcode.value) {
  //   runCode();
  // }
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
.article {
  padding-right: 10px;

  .art-title {
    border-bottom: 1px solid #eee;

    .caption {
      margin-bottom: 9px;
      width: 100%;
      font-size: 26px;
      line-height: 40px;
      color: #333;
      white-space: normal;
      word-break: break-all;
      word-wrap: break-word;
    }

    .art-title-census {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }

    .census-left {
      border-right: 1px solid #eee;
      height: 20px;
      line-height: 20px;
    }

    .census-right {
      display: flex;

      >div {
        margin-left: 20px;
        min-width: 48px;
        cursor: pointer;
        vertical-align: middle;
        font-size: 14px;
        line-height: 30px;
        height: 30px;

        >span {
          vertical-align: middle;
          font-size: 14px;
          line-height: 30px;
          height: 30px;
          display: inline-block;
        }

        >i {
          vertical-align: middle;
        }
      }


    }
  }

  .article-content {
    margin-top: 30px;
  }

  .article-up {
    .up-cover {
      position: absolute;
      width: 50px;
      height: 50px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      border-radius: 50%;
    }

    .up-abstract {
      margin-left: 60px;
    }

    .up-abstract {
      height: 50px;

      .up-name {
        margin-top: 6px;

        >a {
          padding-right: 10px;
          color: #FD4C5C;
        }

        &::after {
          content: '创作者';
          width: 44px;
          height: 22px;
          font-size: 12px;
          line-height: 22px;
          background-color: #4a8eff;
          text-align: center;
          border-radius: 4px;
          color: #fff;
          display: inline-block;
        }
      }

      .up-time {
        width: 100%;
        height: 12px;
        margin-top: 7px;
        text-align: left;
        font-size: 12px;
        line-height: 12px;
        color: #999;
      }
    }

    .article-content {
      margin-left: 50px;
      white-space: normal;
      word-break: break-all;
      word-wrap: break-word;
      line-height: 24px;
      color: #555;
      overflow: hidden;
      font-size: 14px;
    }

    .article-operation {
      display: flex;
      margin-top: 40px;
      margin-bottom: 21px;

      >div {
        margin-left: 20px;
        min-width: 48px;
        cursor: pointer;
        vertical-align: middle;
        font-size: 14px;
        line-height: 30px;
        height: 30px;

        >span {
          vertical-align: middle;
          font-size: 14px;
          line-height: 30px;
          height: 30px;
          display: inline-block;
        }

        >i {
          vertical-align: middle;
        }
      }
    }

    .bd_tag {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .tag-single {
        border: 1px solid #e1e1e1;
        border-radius: 100px;
        padding: 4px 10px;
        margin-right: 10px;
        text-align: center;
        position: relative;
        font-size: 12px;
        margin-bottom: 10px;

        a {
          color: inherit;
        }
      }
    }
  }
}

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
