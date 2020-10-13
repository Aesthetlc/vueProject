<template>
  <div>
    <el-tag
      :key="tag.name"
      v-for="tag in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      @click="clickTag(tag)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      inputVisible: false,
      inputValue: ""
    };
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    ...mapMutations({
      closeTab: "closeTab",
      selectTag: "selectMenu"
    }),
    //关闭tab
    handleClose(tag) {
      this.closeTab(tag);
    },
    //点击tab
    clickTag(tag) {
      this.$router.push({ name: tag.name });
      this.selectTag(tag);
    }
  }
};
</script>
<style lang="less" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
