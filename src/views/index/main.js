import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from '@/router'
import store from '@/store'
import '@/icons/index.js'
import SvgIcon from '@/components/svgIcon/SvgIcon.vue';
// import './icon.js'

const app = createApp(App);
app.component('svg-icon', SvgIcon);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus).use(store).use(router).mount('#app')
