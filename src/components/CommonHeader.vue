<template>
  <header class="header">
    <div class="l-content">
      <el-button
        size="mini"
        plain
        icon="el-icon-menu"
        @click="clickCollapse"
      ></el-button>
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!--很明显 首页 一定是存在的 所以这里直接写死-->
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <!--第二级菜单名称 就要看左侧组件有没有点击指定菜单，没有那就只显示首页 点击就显示当前菜单名称-->
          <el-breadcrumb-item :to="current.path" v-if="current">{{
            current.label
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img class="user" :src="userImg" alt="用户头像" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      userImg: require("./../assets/images/userdefault.png"),
    };
  },
  methods: {
    ...mapMutations(['changeCollapse']),
    clickCollapse() {
      this.changeCollapse();
    },
  },
  computed: {
    ...mapState({
      current: (state) => state.tab.currentMenu,
    }),
  },
};
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  .l-content,
  .r-content {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .l-content .breadcrumb {
    margin-left: 30px;
  }
  .r-content {
    .user {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }
}
</style>

<style lang="less">
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: #fff;
}
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #666666;
    font-weight: normal;
  }

  &:last-child {
    .el-breadcrumb__inner {
      color: #ffffff;
    }
  }
}
</style>
