<template>
  <div ref="myecharts">
    111
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  props: {
    yesterdy: {
      type: Number,
      default: 0
    },
    today: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      myEchart: null,
      options: {
        color: ['#FACC14', '#3AA1FF'],
        tooltip: {
          trigger: 'item',
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
          bottom: 15,
          top: 15
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          show: false
        },
        series: [{
          name: '今天',
          type: 'bar',
          data: [],
          barMinHeight: 1,
          itemStyle: {
            color: '#FACC14',
            borderWidth: 16
          }
        },
        {
          name: '昨天',
          type: 'bar',
          data: [],
          barMinHeight: 1,
          itemStyle: {
            color: '#3AA1FF',
            borderWidth: 20
          }
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
      this.options.series[0].data[0] = this.today
      this.options.series[1].data[0] = this.yesterdy
      this.myEchart = echarts.init(this.$refs.myecharts)
      this.myEchart.setOption(this.options)
    },

    update () {
      if (this.myEchart) {
        this.options.series[0].data[0] = this.today
        this.options.series[1].data[0] = this.yesterdy
        this.myEchart.setOption(this.options)
      } else {
        this.init()
      }
    }
  },

  watch: {
    today () {
      this.update()
    },

    yesterdy () {
      this.update()
    }
  }
}
</script>
