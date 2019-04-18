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
    type: { // 业务类型
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
          formatter: '{b0}</br> {a0}: {c0}<br />{a1}: {c1}%'
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
        yAxis: [
          {
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
          {
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              },
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              color: '#7C7D80',
              formatter: '{value} %'
            }
          }
        ],
        series: [{
          name: this.type === 0 ? '规模保费' : '标准保费',
          type: 'bar',
          barMaxWidth: 40,
          data: []
        },
        {
          name: '环比增长',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
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
      if (Object.keys(this.data).length > 0) {
        let xAxis = []
        let bar = []
        let line = []
        let item1 = this.type === 0 ? this.data.premium : this.data.standard
        if (item1) {
          for (let i = 0; i < item1.length; i++) {
            let xLabel = this.dateType === 0 ? item1[i].date.substring(5) : item1[i].date
            xAxis.push(xLabel)
            bar.push(item1[i].premium)
            line.push(item1[i].rate)
          }
        }
        this.options.xAxis.data = xAxis
        this.options.series[0].data = bar
        this.options.series[1].data = line
      }
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
</style>
