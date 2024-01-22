import { createApp, ref } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import MyTinymce from '@/components/tinymce/MyTinymce.vue'

window.addEventListener('message', init);
const $previewApp = document.querySelector('#previewApp')


function init(event) {
  if (event.data.type !== 'refreshFrame') return;
  const generateConf = JSON.parse(event.data.data.generateConf);
  $previewApp.innerHTML = `${event.data.data.css}<div id="app"></div>`

  let attrs = '';
  if (generateConf.type === 'dialog') {
    attrs += 'v-model="visible" :with-header="false" :title="title"'
  }
  const main = eval(`(${event.data.data.js})`);

  main.template = `<div>
    ${event.data.data.html}
  </div>`
  newVue(main, attrs);
}

function newVue(main, attrs) {
  const app = createApp({
    template: `<div><child ${attrs}/></div>`,
    components: {
      child: main
    },
    data() {
      return {
        visible: true,
        title: 'Dialog Titile'
      }
    }
  })
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.component('Tinymce', MyTinymce);
  app.use(ElementPlus).mount('#app')
}
