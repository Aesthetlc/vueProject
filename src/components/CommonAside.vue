<template>
  <!-- collapse 控制aside是否展开-->
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="collapse"
  >
    <h3 v-show="!collapse">后台系统</h3>
    <h3 v-show="collapse">系统</h3>
    <el-menu-item
      :index="item.path"
      :key="item.path"
      v-for="item in noChildren"
      @click="clickMenu(item)"
    >
      <em :class="'el-icon-' + item.icon"></em>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu
      :index="item.label"
      :key="index"
      v-for="(item, index) in hasChildren"
    >
      <template slot="title">
        <em :class="'el-icon-' + item.icon"></em>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          @click="clickMenu(subItem)"
        >
          <em :class="'el-icon-' + subItem.icon"></em>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      asideMenu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home"
        },
        {
          path: "/video",
          name: "video",
          label: "视频管理",
          icon: "video-play"
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user"
        },
        {
          path: "/other",
          label: "其他",
          icon: "user",
          children: [
            {
              path: "/page1",
              label: "子集页面1",
              name: "page1",
              icon: "setting"
            },
            {
              path: "/page2",
              name: "page2",
              label: "子集页面2",
              icon: "setting"
            }
          ]
        }
      ]
    };
  },
  computed: {
    noChildren() {
      return this.menu.filter(item => !item.children);
    },
    hasChildren() {
      return this.menu.filter(item => item.children);
    },
    ...mapState({
      collapse: state => state.tab.isCollapse
    }),
    menu() {
      return this.$store.state.tab.menu;
    }
  },
  methods: {
    //跳转路由 根据名称跳转
    clickMenu(item) {
      this.$store.commit("selectMenu", item);
      this.$router.push({ name: item.name });
    }
  }
};
</script>
<style lang="less">
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
