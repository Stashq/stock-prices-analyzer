import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import Vuetify from 'vuetify';
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./api";

Vue.use(Vuetify);

Vue.config.productionTip = false;

Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
