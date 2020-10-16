<template>
  <div style="height:100%" ref="echart"></div>
</template>

<script>
export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        };
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.norOption;
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    }
  },
  watch: {
    chartData: {
      handler: function() {
        this.initChart();
      },
      deep: true
    },
    isCollapse() {
      setTimeout(() => {
        this.resizeChart();
      }, 300);
    }
  },
  data() {
    return {
      echart: null,
      //有坐标轴
      axisOption: {
        legend: {
          textStyle: {
            color: "#333"
          }
        },
        grid: {
          left: "10%"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3"
            }
          },
          axisLabel: {
            color: "#333"
          }
        },
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#e5cf0d",
          "#97b552",
          "#95706d",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089"
        ],
        series: []
      },
      //无坐标轴
      norOption: {
        series: [],
        tooltip: {
          trigger: "item"
        }
      }
    };
  },
  mounted() {
    //渲染echart
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  distroyed() {
    window.removeEventListener("resize", this.resizeChart);
  },
  methods: {
    //创建echart对象
    initChart() {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = this.$echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
      }
    },
    //渲染echart数据
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        this.norOption.series = this.chartData.series;
      }
    },
    //重置echart尺寸
    resizeChart() {
      this.echart ? this.echart.resize() : "";
    }
  }
};
</script>
<style></style>
