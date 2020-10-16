<template>
  <div class="manage">
    <div class="manage-header">
      <el-button type="primary">+ 新增</el-button>
      <common-form inline :formLabel="formLabel" :form="searchForm">
        <el-button type="primary">搜索</el-button>
      </common-form>
    </div>
    <common-table
      :config="config"
      :tableLabel="tableLabel"
      :tableData="tableData"
    ></common-table>
  </div>
</template>

<script>
import CommonTable from "../../components/CommonTable";
import CommonForm from "../../components/CommonForm";
export default {
  components: {
    CommonTable,
    CommonForm
  },
  data() {
    return {
      searchForm: {
        keyWord: ""
      },
      formLabel: [
        {
          model: "keyWord",
          label: "",
          opts: []
        }
      ],
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "age",
          label: "年龄"
        },
        {
          prop: "sexLabel",
          label: "性别"
        },
        {
          prop: "birth",
          label: "出生日期"
        },
        {
          prop: "addr",
          label: "地址"
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.config.loading = true;
      this.$http
        .get("/api/user/getUser", {
          parmas: {
            page: this.config.page
          }
        })
        .then(res => {
          console.log(res);
          this.tableData = res.data.list.map(item => {
            item.sexLabel = item.sex === 0 ? "女" : "男";
            return item;
          });
          this.config.total = res.data.count;
          this.config.loading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.manage {
  height: 90%;
  padding-bottom: 20px;
  overflow: hidden;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style>
