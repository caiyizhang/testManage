
export const myFunction = (arg) => {
    return arg + 'test'
}

export const options = (title, series_data) => {
    var legend_data = []
    series_data.forEach(element => {
        legend_data.push(element.name)
    });
    return {
        title: {
            // text: '班级行为分析', // 主标题
            text: title, // 主标题
            subtext: '', // 副标题
            x: 'left' // x轴方向对齐方式
            // x: 'middle' // x轴方向对齐方式
        },
        grid: { containLabel: true },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {d}%'
        },
        // color: ['#1FC48D', '#F5A60A', '#6DC8EC', '#3F8FFF'],
        color: ['red', '#1FC48D', '#6DC8EC', '#3F8FFF'],
        // backgroundColor: '#ffffff',
        legend: {
            orient: 'vertical',
            icon: 'circle',
            align: 'left',
            x: 'right',
            y: 'bottom',
            data: legend_data
        },
        series: [
            {
                name: '课堂行为',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                center: ['40%', '50%'],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    color: function (params) {
                        // 自定义颜色
                        var colorList = ['red', '#1FC48D', '#6DC8EC', '#3F8FFF']
                        return colorList[params.dataIndex]
                    }
                },
                data: series_data
            }
        ]
    }
}


export const options_zxt = (title, bugs) => {
    var month = []
    var test_bug = []
    var online_bug = []
    var escape = []
    bugs.forEach(element => {
        month.push(element.month)
        test_bug.push(element.test_bug)
        online_bug.push(element.online_bug)
        if (element.test_bug === 0) {
          escape.push(200)
        }
        else {
          // escape.push(element.online_bug / element.test_bug * 100)
          escape.push(Math.round(element.online_bug / element.test_bug * 10000) / 100.00)
        }
    });
    console.log(escape)
    return {
          title: {
            text: title, // 主标题
            subtext: '', // 副标题
            x: 'left' // x轴方向对齐方式
          },
          tooltip: {
            trigger: 'axis', // axis   item   none三个值
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            // orient: 'vertical',
            // x: 'center',
            // y: 'top',
            data: ['测试bug', '线上bug', '逃逸率']
          },
          xAxis: {
            type: 'category', // 还有其他的type，可以去官网喵两眼哦
            data: month, // x轴数据
            name: '', // x轴名称
            // x轴名称样式
            // nameTextStyle: {
            //   fontWeight: 600,
            //   fontSize: 18
            // }
            axisPointer: {
              type: 'shadow'
            }
          },
          yAxis: [
            {
              type: 'value',
              name: 'bug数' // y轴名称
              // y轴名称样式
              // nameTextStyle: {
              //   fontWeight: 600,
              //   fontSize: 18
              // }
            },
            {
              type: 'value',
              name: 'bug逃逸率',
              // min: 0,
              // max: 0.25,
              // interval: 0.05,
              axisLabel: {
                formatter: '{value}%'
              }
            }
          ],
          series: [
            {
              name: '测试bug',
              type: 'bar',
              data: test_bug
            },
            {
              name: '线上bug',
              type: 'bar',
              data: online_bug
            },
            {
              name: '逃逸率',
              type: 'line',
              yAxisIndex: 1,
              tooltip: {
                valueFormatter: function (value) {
                  return value + '%';
                }
              },
              data: escape
            },
          ]
    }
}


export const bingtu_option =(title, data) => {
  let series_data = []
  console.log(data)
  Object.keys(data).forEach((bug_type)=>{
    series_data.push({name: bug_type, value: data[bug_type]})
  })
  return {
    title: {
      text: title,
      subtext: '',
      // x: 'middle'
      x: 'center',
      // top: 10
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      // orient: 'vertical',
      // top: '5%',
      top: 'bottom',
      // left: legend_pos
      left: 'center'
    },
    series: [
      {
        // name: 'Access From',
        name: '',
        type: 'pie',
        radius: '50%',
        // data: [
        //   { value: 1048, name: 'Search Engine' },
        //   { value: 735, name: 'Direct' },
        //   { value: 580, name: 'Email' },
        //   { value: 484, name: 'Union Ads' },
        //   { value: 300, name: 'Video Ads' }
        // ],
        data: series_data,
        label: {
          formatter: '{b}: {@2012} ({d}%)'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            // shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
}


export const shareDataset =(title, data) => {
  let series_data = []
  console.log(data)
  Object.keys(data).forEach((bug_type)=>{
    series_data.push({name: bug_type, value: data[bug_type]})
  })
  return {
    title: {
      // text: title,
      subtext: '',
      x: 'center',
      // top: 0
    },
    legend: {top: 0},
    tooltip: {
      trigger: 'axis',
      showContent: false
    },
    dataset: {
      // source: [
      //   ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
      //   ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
      //   ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
      //   ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
      //   ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
      // ]
      source: data
    },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: { top: '55%' },
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '30%'],
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}: {@data[0][1]} ({d}%)'
        },
        encode: {
          itemName: 'product',
          value: data[0][1],
          tooltip: data[0][1]
        }
      }
    ]
  };
}