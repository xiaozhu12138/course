<template>
  <div>
    <div>
      <div class="title">
        <p>CPU</p>
        <p>Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz</p>
      </div>
      <div class="title">
        <p>% 利用率</p>
        <p>100%</p>
      </div>
      <div id="main" style="height: 300px" ref="main"></div>
      <div class="title">
        <p>60</p>
        <p>0</p>
      </div>
    </div>

    <div class="cn">
      <div class="cn_map" ref="cn"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts/map/js/china";
export default {
  mounted() {
    let myChart = echarts.init(this.$refs.main);
    let myChartcn = echarts.init(this.$refs.cn);
    let xData = [];
    for (let i = 0; i < 61; i++) {
      xData.push(i);
    }
    let sData = new Array(61);
    sData[sData.length - 1] = 0;
    this.renderChart(myChart, xData, sData);
    this.renderCnmap(myChartcn);
    this.time = setInterval(() => {
      let num = Math.round(Math.random() * 100);
      sData.shift();
      sData.push(num);
      this.renderChart(myChart, xData, sData);
    }, 1000);

    window.addEventListener("resize", function () {
      myChart.resize();
    });
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  methods: {
    renderChart(myChart, xData, sData) {
      myChart.setOption({
        title: {
          show: true,
        },
        xAxis: {
          data: xData,
          show: true,
          boundaryGap: false,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          axisLabel: {
            show: false,
          },
          animation: false,
          splitLine: {
            show: true,
            shadowBlur: 0,
            lineStyle: {
              color: "skyblue",
              opacity: 0.2,
            },
          },
        },
        yAxis: {
          type: "value",
          max: 100,
          min: 0,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: true,
            shadowBlur: 0,
            lineStyle: {
              color: "skyblue",
              opacity: 0.2,
            },
          },
        },
        grid: {
          top: 1,
          bottom: 1,
          left: 1,
          right: 5,
          show: true,
          borderWidth: 1,
          borderColor: "skyblue",
        },
        series: [
          {
            type: "line",
            data: sData,
            symbol: "none",
            areaStyle: {
              color: "#409EFF",
              opacity: 0.2,
            },
            animation: false,
            lineStyle: {
              color: "#409EFF",
            },
          },
        ],
      });
    },
    renderCnmap(myChart) {
      let option = {
        tooltip: {
          show: false,
        },
        geo: {
          map: "china",
          roam: false, // 一定要关闭拖拽
          zoom: 1.23,
          center: [105, 36], // 调整地图位置
          label: {
            normal: {
              show: false, //关闭省份名展示
              fontSize: "10",
              color: "rgba(0,0,0,0.7)",
            },
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              areaColor: "#0d0059",
              borderColor: "#389dff",
              borderWidth: 1, //设置外层边框
              shadowBlur: 5,
              shadowOffsetY: 8,
              shadowOffsetX: 0,
              shadowColor: "#01012a",
            },
            emphasis: {
              areaColor: "#184cff",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 5,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        series: [
          {
            type: "map",
            map: "china",
            roam: false,
            zoom: 1.23,
            center: [105, 36],
            // geoIndex: 1,
            // aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            itemStyle: {
              normal: {
                areaColor: "#0d0059",
                borderColor: "#389dff",
                borderWidth: 0.5,
              },
              emphasis: {
                areaColor: "#17008d",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 5,
                borderWidth: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
     
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
}
.cn_map{
  height:500px;
}
</style>