import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'


Vue.config.productionTip = false;

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        Authorization: localStorage.getItem('token'),
        accept: "application/json",
    }
});

api.defaults.headers.common[
    "Authorization" 
  ] = localStorage.getItem('token');
  
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
