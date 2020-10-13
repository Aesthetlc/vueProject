<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#33aef0"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="collapse"
  >
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
      :index="item.path"
      :key="index"
      v-for="(item, index) in hasChildren"
    >
      <template slot="title">
        <em class="el-icon-location"></em>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, index) in item.children"
          :key="index"
          @click="clickMenu(subItem)"
          >{{ subItem.label }}</el-menu-item
        >
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
          icon: "s-home",
        },
        {
          path: "/video",
          name: "video",
          label: "视频管理",
          icon: "video-play",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
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
              icon: "setting",
            },
            {
              path: "/page2",
              name: "page2",
              label: "子集页面2",
              icon: "setting",
            },
          ],
        },
      ],
    };
  },
  computed: {
    noChildren() {
      return this.asideMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asideMenu.filter((item) => item.children);
    },
    ...mapState({
      collapse: (state) => state.tab.isCollapse,
    }),
  },
  methods: {
    //跳转路由 根据名称跳转
    clickMenu(item) {
      this.$store.commit("selectMenu", item);
      this.$router.push({ name: item.name });
    },
  },
};
</script>
<style lang="less">
.el-menu {
  height: 100%;
  border: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
