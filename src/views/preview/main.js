import { createApp, ref } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import MyTinymce from '@/components/tinymce/MyTinymce.vue'

window.addEventListener('message', init);
const $previewApp = document.querySelector('#previewApp')


function init(event) {
  if (event.data.type !== 'refreshFrame') return;
  $previewApp.innerHTML = `${event.data.data.css}<div id="app"></div>`
  const main = eval(`(${event.data.data.js})`);

  main.template = `<div>
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
  app.component('Tinymce', MyTinymce);
  app.use(ElementPlus).mount('#app')
}
