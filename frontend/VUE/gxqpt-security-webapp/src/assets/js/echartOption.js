// 带标记的线形图,例子查看运维系统-运维分析-共性模块监控第一个图
// 使用时替换需要替换的字段即可，如两个data
function symbolLine () {
  return {
    color: ['#487EC1', '#48B9C1', '#A27DE2', '#32C0D6'],
    tooltip: {
      formatter: '{b}：{c}'
    },
    xAxis: {
      type: 'category',
      name: '月份',
      data: [12, 11]
    },
    yAxis: {
      type: 'value',
      name: '个数'
    },
    series: [{
      type: 'line',
      symbol: 'circle',
      symbolSize: (value, params) => {
        if (value > 999) {
          return 40
        }
        if (value > 99 && value < 1000) {
          return 30
        }
        if (value < 100) {
          return 20
        }
      },
      label: {
        show: true,
        position: 'inside'
      },
      data: [20, 100]
    }]
  }
}

// 带标签的柱形图，例子查看运维系统-运维分析-共性模块监控第二个图
function symbolBar () {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
          backgroundColor: '#333'
        }
      }
    },
    xAxis: {
      type: 'category',
      name: '月份'
    },
    yAxis: {
      splitLine: {
        show: true
      }
    },
    series: [{
      name: '模块使用量',
      type: 'pictorialBar',
      label: {
        show: true,
        position: 'top',
        fontSize: 20,
        color: '#000'
      },
      // itemStyle: {
      //   normal: {
      //     color: '#0f375f'
      //   }
      // },
      symbol: 'rect',
      symbolRepeat: true,
      symbolSize: [10, 4],
      symbolMargin: 1
    }]
  }
}

// 横向柱形图，例子查看运维系统-运维分析-共性模块监控第三个图
function horizontalBar () {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      name: '次数'
    },
    yAxis: {
      type: 'category',
      name: '模块名称',
      axisLabel: {
        show: false
      },
      data: ['2018', '2019']
    },
    series: [{
      type: 'bar',
      data: [10, 20]
    }]
  }
}

// 带有区域阴影的线形图
function areaLine () {
  return {
    color: ['#487EC1', '#48B9C1', '#A27DE2', '#32C0D6'],
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      name: '日期',
      type: 'category',
      boundaryGap: false,
      data: [],
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    series: [{
      type: 'line',
      smooth: true,
      symbol: 'none',
      sampling: 'average',
      itemStyle: {
        normal: {
          color: '#487EC1'
        }
      },
      areaStyle: {
        normal: {
          color: '#48B9C1'
        }
      },
      data: []
    }]
  }
}
function dataPie () { // 数据饼图
  return {
    color: ['#487EC1', '#48B9C1', '#A27DE2', '#32C0D6'],
    title: {
      text: '标题',
      // subtext: '纯属虚构',
      bottom: 10,
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      top: '20%',
      left: '10%',
      data: ['1', '2', '3', '4', '5']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['60%', '50%'],
        data: [
          { value: 1, name: '1' },
          { value: 2, name: '2' },
          { value: 3, name: '3' },
          { value: 4, name: '4' },
          { value: 5, name: '5' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}
function multipleLine () { // 多条线
  return {
    color: ['#D53A35', '#E98F6F', '#6AB0B8', '#334B5C'],
    // title: {
    //    text: '报警次数'
    // },
    tooltip: {
      trigger: 'axis'
      // formatter: "{b} <br> 合格率: {c}%"
    },
    legend: {
      data: ['旅游运输', '班线运输', '危险品', '普货']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    xAxis: {
      type: 'category',
      name: '月份',
      boundaryGap: false,
      data: ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7']
    },
    yAxis: {
      type: 'value'
      // name: '报警次数',
    },
    series: [{
      name: '旅游运输',
      type: 'line',
      stack: '总量',
      data: [120, 132, 101, 134, 90, 230, 210]
    }, {
      name: '班线运输',
      type: 'line',
      stack: '总量',
      data: [220, 182, 191, 234, 290, 330, 310]
    }, {
      name: '危险品',
      type: 'line',
      stack: '总量',
      data: [150, 232, 201, 154, 190, 330, 410]
    }, {
      name: '普货',
      type: 'line',
      stack: '总量',
      data: [320, 332, 301, 334, 390, 330, 320]
    }]
  }
}

// 简单的柱形图
function simpleBar () {
  return {
    color: ['#D53A35', '#E98F6F', '#6AB0B8', '#334B5C'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      top: '15px',
      left: '60px',
      right: 'auto',
      data: ['待处理', '产生', '已处理'],
      textStyle: {
        fontSize: 12,
        color: '#333'
      }
    },
    grid: {
      left: '60px',
      right: '60px',
      bottom: '60px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['2018', '2019', '2010'],
      axisLabel: {
        interval: 0,
        rotate: 40
      },
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true
      },
      axisLine: {
        lineStyle: {
          color: '#666',
          fontSize: '12'
        }
      }
    },
    series: [{
      name: '待处理',
      type: 'bar',
      data: [20, 30, 10],
      barWidth: 8,
      itemStyle: {
        fontSize: '12'
      }
    }, {
      name: '产生',
      type: 'bar',
      data: [40, 10, 10],
      barWidth: 8,
      itemStyle: {
        fontSize: '12'
      }
    }, {
      name: '已处理',
      type: 'bar',
      data: [70, 30, 70],
      barWidth: 8,
      itemStyle: {
        fontSize: '12'
      }
    }]
  }
}
export { symbolLine, symbolBar, horizontalBar, areaLine, dataPie, multipleLine, simpleBar }
