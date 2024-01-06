<template>
  <div class="box">
    <div>
       <div id="echarts" style="width:calc(100vw - 320px);height:calc(100vh - 200px);margin:50px auto;"></div>
    </div>
    <div class="box-text">日期</div>
  </div>
</template>
<script>
import { crashrate } from '../api/market'
import * as echarts from 'echarts';
export default {
  data() {
    return {
      xAxis: [],
      YAxis: [],
      list: []
    }
  },
  created() { },
  mounted() {
    this.typeCharts0()
  },
  methods: {
    async typeCharts0() {
      let res = await crashrate();
      this.list = res.data.data;
      this.xAxis = res.data.data.map(item => item.date);
      this.YAxis = res.data.data.map(item => item.percent * 100);
      var that = this;
      let option = this.getOption();
      var chartDom = document.getElementById('echarts');
      var myChart = echarts.init(chartDom);
      myChart.getZr().on('click', function (params) {
        const actionObj = params.target;
        if (actionObj) {
          const myKey = Object.keys(actionObj).sort().filter(_ => _.indexOf('ec_inner') !== -1)[0];
          if (myKey) {
            const res = actionObj[myKey];
            if (res && res.dataIndex !== undefined) {
              console.log(`当前点击了第${res.dataIndex}组数据中`);
              that.$router.push({
                path: '/Layout/market',
                query: {
                  date: that.list[res.dataIndex].date
                }
              })
            } else {
              that.$message.error("响应对象中缺少或无效的 'dataIndex' 属性。");
            }
          } else {
            that.$message.error("actionObj 中缺少或无效的 'myKey' 属性。");
          }
        } else {
          that.$message.error("params 对象中缺少或无效的 'target' 属性。");
        }
      })
      myChart.setOption(option, true);
      setTimeout(() => {
        window.onresize = function () {
          myChart.resize()
        }
      }, 2000)
    },
    getOption(data) {
      let option = {
        color: ["#2B80FF", "#3DF3C4"],
        title: [
          {
            left: 'center',
            text: '闪退率趋势',
            fontSize: 30
          },
          {
            left: '20',
            text: '闪退率(%)',
            textStyle: {
              lineHeight: '45',
              fontSize: 16
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (val) {
            let string = val[0].name + "<br>";
            val.forEach(v => {
              string += `<div style='display: flex;align-items: center;justify-content: space-between;'><span>${v.marker}${v.seriesName}</span>&nbsp; &nbsp; <span style='font-weight: 700;'>${v.value}%</span></div>`
            });
            return string
          }
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: 'top',
          show: false,
          textStyle: {
            fontSize: 12,
          },
          data: [
            {
              name: '闪退率',
              textStyle: {
                color: "#2B80FF "
              }
            }
          ],
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ccc',
          borderWidth: 0,
          padding: 5,
          itemGap: 10,
          itemWidth: 20,
          itemHeight: 14,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            rotate: 45   // 将角度改为-45表示逆时针倾斜45度
          },
          data: this.xAxis
        },
        yAxis: {
          type: 'value',
        },
        // dataZoom: [//x轴滑动条
        //   {
        //     type: 'slider',
        //     show: true,
        //     xAxisIndex: [0],
        //     start: 0,    //初始化时，滑动条宽度开始标度
        //     bottom: '1%',
        //     end: 100,
        //     height: 10,
        //     fillerColor: '#3E86FF',
        //     borderColor: "transparent",
        //     backgroundColor: 'white',//两边未选中的滑动条区域的颜色
        //     showDataShadow: false,//是否显示数据阴影 默认auto
        //     showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
        //   },
        //   {
        //     type: 'inside',
        //     xAxisIndex: 0,
        //     zoomOnMouseWheel: false,  //滚轮是否触发缩放
        //     moveOnMouseMove: true,  //鼠标滚轮触发滚动
        //     moveOnMouseWheel: true
        //   }
        // ],
        series: [
          {
            name: '闪退率',
            type: 'line',
            stack: 'Total',
            data: this.YAxis,
          },
        ]
      };
      return option;
    }

  }
}
</script>
<style lang="less" scoped>
.box{
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: end;
 #echarts{
  flex:1;
 }
 .box-text{
  width: 80px;
  margin-bottom: 6%;
 }
}
</style>
