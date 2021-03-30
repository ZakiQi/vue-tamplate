<template>
  <div>
    <div ref="dom" class="charts chart-bar"></div>
  </div>
</template>

<script>
import { requireEcharts } from './index'
import tdTheme from './theme.json'

export default {
  name: 'ChartBar',

  data() {
    return {
      echart: null
    }
  },

  methods: {
    initCharts() {
      const option = {
        title: {
          text: '柱状图'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }

      const dom = this.echarts.init(this.$refs.dom)

      dom.setOption(option)
    }
  },

  created() {
    this.echarts = null
    requireEcharts().then((echarts) => {
      this.echarts = echarts
      this.echarts.registerTheme('tdTheme', tdTheme)
      this.$nextTick(() => this.initCharts())
    })
  }
}
</script>

<style scoped>
.charts {
  height: 100%;
}
</style>
