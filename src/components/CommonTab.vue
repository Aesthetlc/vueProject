<template>
  <div>
    <el-tag
      :key="tag.name"
      v-for="tag in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      @click="clickTag(tag)"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
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
.el-tag {
  cursor: pointer;
  margin-right: 15px;
}
</style>
