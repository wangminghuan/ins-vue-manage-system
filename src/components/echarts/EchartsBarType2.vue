<template>
  <div ref="myecharts">
    111
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  props: {
    data: {
      type: Array
    }
  },

  data () {
    return {
      myEchart: null,
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
          }
        },
        grid: {
          left: 1,
          right: 1,
          bottom: 20,
          top: 10
        },
        xAxis: {
          type: 'category',
          data: [],
          show: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          type: 'bar',
          barMinHeight: 1,
          data: []
        }
        ]}
    }
  },

  mounted () {
    this.init()
    let vm = this
    window.onresize = function () {
      if (vm.myEchart) {
        vm.myEchart.resize()
      }
    }
  },

  methods: {
    init () {
      this.buildData()
      this.myEchart = echarts.init(this.$refs.myecharts).setOption(this.options)
    },

    update () {
      if (this.myEchart) {
        this.buildData()
        this.myEchart.setOption(this.options)
      } else {
        this.init()
      }
    },

    buildData () {
      let xData = []
      let yData = []
      if (this.data) {
        for (let i = 0; i < this.data.length; i++) {
          xData.push(this.data[i].power_month)
          yData.push(this.data[i].power_num)
        }
      }

      this.options.xAxis.data = xData
      this.options.series[0].data = yData
    }
  },

  watch: {
    'data' () {
      this.update()
    }
  }
}
</script>
