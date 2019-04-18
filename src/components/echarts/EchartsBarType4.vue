<template>
  <el-row>
    <el-col :span="15">
      <p class="echart-title">保费趋势</p>
      <div ref="myecharts" style="height: 420px;"></div>
    </el-col>
    <el-col :span="9" class="rank-list">
      <org-rank :list="data.ranklist"></org-rank>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from 'echarts'
import OrgRank from '@/components/other/OrgRank.vue'

export default {
  components: {
    OrgRank
  },
  props: {
    data: {
      type: Object
    },
    type: {
      type: Number
    },
    dateType: { // 日期类型
      type: Number
    }
  },

  data () {
    return {
      myEcharts: null,
      options: {
        color: ['#3AA1FF'],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderWidth: '1',
          borderColor: 'gray',
          textStyle: {
            color: '#000',
            extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: 40,
          right: 50,
          bottom: 20,
          top: 50,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: [5, 0],
          data: [],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          name: this.title,
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLabel: {
            show: true,
            color: '#7C7D80',
            formatter: this.yAxisLabFormat
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          name: '规模保费',
          type: 'bar',
          barMaxWidth: 40,
          data: []
        },
        {
          name: '标准保费',
          type: 'bar',
          barMaxWidth: 40,
          itemStyle: {
            color: '#FACC14'
          },
          data: []
        }
        ]}
    }
  },

  mounted () {
    this.init()
    let vm = this
    window.onresize = function () {
      if (vm.myEcharts) {
        vm.myEcharts.resize()
      }
    }
  },

  methods: {
    init () {
      this.buildData()
      this.myEcharts = echarts.init(this.$refs.myecharts)
      this.myEcharts.setOption(this.options)
    },

    buildData () {
      let xAxis = []
      let bar1 = []
      let bar2 = []
      let item1 = this.data.premium
      let item2 = this.data.standard

      if (item1) {
        for (let i = 0; i < item1.length; i++) {
          let xLabel = this.dateType === 0 ? item1[i].date.substring(5) : item1[i].date
          xAxis.push(xLabel)
          bar1.push(item1[i].premium)
          bar2.push(item2[i].premium)
        }
      }

      this.options.xAxis.data = xAxis
      this.options.series[0].data = bar1
      this.options.series[1].data = bar2
    },
    yAxisLabFormat (d) {
      if (d < 1000) {
        return d
      }
      var k = 0
      if (d % 1000 === 0) {
        k = d / 1000
      } else {
        k = (parseInt(d / 1000) + (d % 1000) / 1000).toFixed(1)
      }
      if (k < 1000) {
        return k + 'k'
      } else if (k >= 1000) {
        var m = 0
        if (k % 1000 === 0) {
          m = k / 1000
        } else {
          m = (parseInt(k / 1000) + (k % 1000) / 1000).toFixed(1)
        }
        return m + 'm'
      }
      return d
    }
  },

  watch: {
    'data' () {
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
.echart-title {
  color: #303133;
  font-size: 16px;
  margin-top: 15px;
}
.rank-list {
  .rank-title {
    color: #303133;
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 36px;
  }

  .rank-item {
    height: 22px;
    line-height: 22px;
    margin: 11px 10px;

    .rank-name {
      color: #606266
    }

    .rank-num {
      color: #606266
    }
  }

  .rank-index {
    width: 22px;
    height: 22px;
    border-radius: 11px;
    background: #E6E6E6;
    color: #303133;
    text-align: center
  }

  .index1 {
    color: #fff;
    background: #F8C750
  }

  .index2 {
    color: #fff;
    background: #B4C4E1
  }

  .index3 {
    background: #C8A985;
    color: #fff
  }
}
</style>
