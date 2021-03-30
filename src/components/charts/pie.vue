<template>
  <div>
    <div ref="pie" class="charts chart-pie"></div>
  </div>
</template>

<script>
import { requireEcharts } from './index'
import tdTheme from './theme.json'

export default {
  name: 'ChartPie',

  props: {
    data: Array,
    text: String,
    subtext: String
  },

  data() {
    return {
      charts: null
    }
  },

  methods: {
    initCharts() {
      const legend = this.data.map((_) => _.name)
      const option = {
        title: {
          text: this.text,
          subtext: this.series,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: legend
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.data,
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
      const dom = this.echarts.init(this.$refs.pie, 'tdTheme')
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
