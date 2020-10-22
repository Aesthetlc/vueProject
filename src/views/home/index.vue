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
      </el-card>
      <el-card shadow="hover">
        <echart style="height:250px" :chartData="echartData.order"></echart>
      </el-card>
      <div style="display:flex">
        <el-card shadow="hover" style="width:49%">
          <echart
            style="height:200px"
            :chartData="echartData.userData"
          ></echart>
        </el-card>
        <el-card shadow="hover" style="width:49%">
          <echart
            :isAxisChart="false"
            :chartData="echartData.video"
            style="height:200px;"
          ></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from "../../components/Echart";
export default {
  data() {
    return {
      userImg: require("./../../assets/images/userdefault.png"),
      //table 数据
      tableData: [],
      //折线图数据
      orderData: [],
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
      ],
      echartData: {
        order: {
          xData: [],
          series: []
        },
        userData: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    };
  },
  components: {
    Echart
  },
  created() {
    this.$http.get("/home/getData").then(res => {
      res = res.data;
      this.tableData = res.data.tableData;
      //折线图
      const order = res.data.orderData;
      //xData
      this.echartData.order.xData = order.date;
      //series
      let keyArray = Object.keys(order.data[0]);
      keyArray.forEach(key => {
        this.echartData.order.series.push({
          name: key,
          data: order.data.map(item => item[key]),
          type: "line"
        });
      });

      //柱状图
      const histogram = res.data.userData;
      //xData
      this.echartData.userData.xData = histogram.map(item => item.date);
      //series
      const newArr = [];
      const activeArr = [];
      histogram.forEach(item => {
        newArr.push(item.new);
        activeArr.push(item.active);
      });
      this.echartData.userData.series.push({
        name: "新增用户",
        data: newArr,
        type: "bar"
      });
      this.echartData.userData.series.push({
        name: "活跃用户",
        data: activeArr,
        type: "bar"
      });
      // 视频饼图
      this.echartData.video.series.push({
        data: res.data.videoData,
        type: "pie"
      });
    });
  },
  mounted() {
    //折线图
  },
  methods: {}
};
</script>
<style lang="less" scoped>
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
  .iconDetailMes /deep/ .el-card__body {
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
