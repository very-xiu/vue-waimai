import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import VueLazyload from 'vue-lazyload'
// 加载mockServer即可
import './mock/mockServer'
import './fiters' // 加载过滤器
// 注册全局组件标签
Vue.component(Button.name,Button)

import loading from './common/imgs/loading.gif'
Vue.use(VueLazyload, { // 内部自定义一个指令lazy
  loading
})

// 导入字体样式
import 'font-awesome/css/font-awesome.css'

new Vue({
  el: '#app',
  router, //使用vue-router
  render: c => c(App),
  store //使用vuex
})
