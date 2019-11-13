import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'

new Vue({
  el: '#app',
  router, //使用vue-router
  render: c => c(App),
  store //使用vuex
})
