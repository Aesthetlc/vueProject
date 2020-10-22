import Cookie from "js-cookie";
export default {
  //存储数据
  state: {
    isCollapse: false,
    //当前的所在页
    currentMenu: null,
    menu: [],
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
    //设置菜单
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
      console.log(val, "vuex");
    },
    //清除菜单
    clearMenu(state) {
      state.menu = [];
      Cookie.remove("menu");
    },
    //添加菜单
    addMenu(state, router) {
      if (!Cookie.get("menu")) {
        return;
      }
      //取出cookie数据 给vuex
      let menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      //添加动态路由 主路由为Main.vue
      let currentMenu = [
        {
          path: "/",
          component: () => import(`@/views/Main`),
          children: []
        }
      ];
      //如果是一级菜单 那么菜单名称肯定有路由 如果是二级菜单那么一级没有 二级有路由
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`);
            return item;
          });
          currentMenu[0].children.push(...item.children);
        } else {
          item.component = () => import(`@/views/${item.url}`);
          currentMenu[0].children.push(item);
        }
      });
      //添加动态路由
      router.addRoutes(currentMenu);
    },
    //导航是否伸展，收缩
    changeCollapse(state, val) {
      state.isCollapse = !state.isCollapse;
    },
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
      let delFlag = state.tabsList.findIndex(item => item.name === val.name);
      state.tabsList.splice(delFlag, 1);
    }
  },
  actions: {}
};
