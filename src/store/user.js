import Cookie from "js-cookie";
export default {
  //存储数据
  state: {
    token: ""
  },
  //调用方法
  mutations: {
    //设置token
    setToken(state, val) {
      state.token = val;
      Cookie.set("token", val);
    },
    //清除token
    clearToken(state) {
      state.token = "";
      Cookie.remove("token");
    },
    getToken(state) {
      state.token = Cookie.get("token");
    }
  },
  actions: {}
};
