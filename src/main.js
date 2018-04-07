import Vue from "vue";
import router from "./router/router.js";
import axios from 'axios';

Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  data: {},
  template: `<router-view></router-view>`,
  router: router
})
