import { createApp } from "vue";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import App from './App.vue';
import addTheme from '@/styles/theme'
import Mock from 'mockjs';
import '@/mock/index.js'; // 引入Mock.js配置文件

createApp(App).use(ElementPlus).mount('#squareApp');
addTheme()
// if (process.env.NODE_ENV === 'development') {
//   Mock.start(); // 在开发环境中启用Mock.js
// }
