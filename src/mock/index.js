import Mock from "mockjs";
import homeApi from './home'

//设置延时 200-2000ms
Mock.setup({
  timeout: "200-2000"
});

//首页相关
Mock.mock(/\/home\/getData/,'get',homeApi.getStatisticalData)
