<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="userMes">
          <img class="userImg" :src="userImg" alt="用户头像" />
          <div class="userDeatilMes">
            <p>Nock</p>
            <p>超级管理员</p>
          </div>
        </div>
        <div class="loginMes">
          <p>上次登录时间:<span>2019-10-20</span></p>
          <p>上次登录地点:<span>北京</span></p>
        </div>
      </el-card>
      <el-card shadow="hover">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableTitle"
            :width="key == 'name' ? 60 : ''"
            :key="val"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card shadow="never">
        <div class="iconMes">
          <el-card
            shadow="hover"
            class="iconDetailMes"
            v-for="item in countData"
            :key="item.name"
            style="width:32%;margin-bottom:5px"
          >
            <div class="icon" :style="{ 'background-color': item.color }">
              <em
                style="font-size:30px;color:#fff"
                :class="`el-icon-${item.icon}`"
              ></em>
            </div>
            <div class="briefMes">
              <div style="text-align:center">
                <p class="money">$ {{ item.value }}</p>
                <p class="mes">{{ item.name }}</p>
              </div>
            </div>
          </el-card>
        </div>
      </el-card></el-col
    >
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      userImg: require("./../../assets/images/userdefault.png"),
      //table 数据
      tableData: [],
      tableTitle: {
        name: "名称",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买"
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单",
          value: 123,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "今日成功订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "本月收藏订单",
          value: 123,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "本月成功订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        }
      ]
    };
  },
  mounted() {
    this.$http.get("/home/getData").then(res => {
      this.tableData = res.data.data.tableData;
    });
  }
};
</script>
<style lang="less">
.userMes {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #999;
  .userImg {
    height: 120px;
    width: 120px;
    border-radius: 50%;
  }
  .userDeatilMes {
    font-size: 18px;
    width: 60%;
    text-align: center;
  }
}

.loginMes {
  margin-top: 20px;
  margin-left: 20px;
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
  }
  span {
    color: #666;
    margin-left: 60px;
  }
}
.iconMes {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .iconDetailMes .el-card__body {
    display: flex;
    height: 60px;
    padding: 0px;
    cursor: pointer;
    .icon {
      display: flex;
      width: 30%;
      align-items: center;
      justify-content: center;
    }
    .briefMes {
      display: flex;
      width: 70%;
      align-items: center;
      justify-content: center;
      .money {
        font-size: 20px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
