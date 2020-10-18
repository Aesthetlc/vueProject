<template>
  <div class="manage">
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <common-form :formLabel="editLabel" :form="editForm"> </common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserMes">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary">+ 新增</el-button>
      <common-form inline :formLabel="formLabel" :form="searchForm">
        <el-button type="primary">搜索</el-button>
      </common-form>
    </div>
    <common-table
      @edit="edit"
      @del="del"
      @changePage="getList"
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
    CommonForm,
  },
  data() {
    return {
      dialogVisible: false,
      dialogTitle: "",
      editForm: {
        name: "",
        age: "",
        birth: "",
        addr: "",
        sex: 1,
      },
      editLabel: [
        {
          model: "name",
          label: "姓名",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              value: 1,
              label: "男",
            },
            {
              value: 0,
              label: "女",
            },
          ],
        },
        {
          model: "age",
          label: "年龄",
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
        },
      ],
      searchForm: {
        keyWord: "",
      },
      formLabel: [
        {
          model: "keyWord",
          label: "",
          opts: [],
        },
      ],
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
          width: "auto",
        },
        {
          prop: "age",
          label: "年龄",
          width: "auto",
        },
        {
          prop: "sexLabel",
          label: "性别",
          width: "auto",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: "200px",
        },
        {
          prop: "addr",
          label: "地址",
          width: "320px",
        },
      ],
      config: {
        page: 1,
        total: 30,
        loading: false,
      },
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
            page: this.config.page,
          },
        })
        .then((res) => {
          this.tableData = res.data.list.map((item) => {
            item.sexLabel = item.sex === 0 ? "女" : "男";
            return item;
          });
          this.config.total = res.data.count;
          this.config.loading = false;
        });
    },
    edit(row) {
      this.dialogTitle = "编辑";
      this.dialogVisible = true;
      this.editForm = row;
    },
    del(row, index) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(index);
          this.$http
            .get("/api/user/del", {
              params: {
                id: row.id,
              },
            })
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.tableData.splice(index, 1);
              // this.getList()
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    updateUserMes() {
      this.$http.post("/api/user/edit", this.editForm).then((res) => {
        console.log(res);
        this.dialogVisible = false;
      });
    },
  },
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
