import { createApp, ref } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


window.addEventListener('message', init);
const $previewApp = document.querySelector('#previewApp')


function init(event) {
  if (event.data.type !== 'refreshFrame') return;
  $previewApp.innerHTML = `<div id="app"></div>`
  const main = eval(`(${event.data.data.js})`);
  main.template = `<div>{{formData.a}}{{str }}
    <el-button>123123</el-button>
    ${event.data.data.html}
  </div>`

  newVue(main);
}

function newVue(main) {
  const app = createApp({
    template: `<div><child :str="12345"/></div>`,
    components: {
      child: main
    },
  })
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  app.use(ElementPlus).mount('#app')
}
