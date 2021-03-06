import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//全局配置
import "./assets/style/reset.css";
import "element-ui/lib/theme-chalk/index.css";
import http from "@/api/config.js";
import "./mock";

//第三方包
import ElementUI from "element-ui";
import echarts from "echarts";

Vue.use(ElementUI);
Vue.prototype.$http = http;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  store.commit("getToken");
  let token = store.state.user.token;
  if (!token && to.name !== "Login") {
    next({ name: "Login" });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit("addMenu", router);
  }
}).$mount("#app");
