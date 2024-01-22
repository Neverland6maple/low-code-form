import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from '@/router'
import store from '@/store'
import '@/icons/index.js'
import SvgIcon from '@/components/svgIcon/SvgIcon.vue';
import MyTinymce from '@/components/tinymce/MyTinymce.vue'



const app = createApp(App);
app.component('svg-icon', SvgIcon);
app.component('Tinymce', MyTinymce);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus).use(store).use(router).mount('#app')
