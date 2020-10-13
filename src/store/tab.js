export default {
  //存储数据
  state: {
    isCollapse: false,
    //当前的所在页
    currentMenu: null,
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "home"
      }
    ]
  },
  //调用方法
  mutations: {
    //选择标签 选择面包屑
    selectMenu(state, val) {
      if (val.name === "home") {
        state.currentMenu = null;
      } else {
        state.currentMenu = val;
        //如果存在就不让再次添加   -1不存在
        let result = state.tabsList.findIndex(item => item.name === val.name);
        if (result == -1) {
          state.tabsList.push(val);
        }
      }
    },
    //关闭标签
    closeTab(state, val) {
       let delFlag =  state.tabsList.findIndex(item => item.name === val.name)
       state.tabsList.splice(delFlag,1)
    }
  },
  actions: {}
};
