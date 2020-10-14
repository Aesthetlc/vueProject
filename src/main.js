import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//全局配置
import "./assets/style/reset.css";
import "element-ui/lib/theme-chalk/index.css";
import http from "@/api/config.js";
import './mock'

//第三方包
import ElementUI from "element-ui";

Vue.use(ElementUI);
Vue.prototype.$http = http;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
