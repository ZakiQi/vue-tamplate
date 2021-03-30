<template>
  <v-chart
    v-bind="$attrs"
    class="line-charts"
    ref="line"
    :options="lineData"
    :chartsType="'line'"
  ></v-chart>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/chart/line'
import { formatDate } from '@/lib/utils/change'

export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    // 阈值
    thresholdValue: {
      type: String / Number,
      default: 0
    },
    type: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    configData: {
      type: Object,
      default: () => {}
    }
  },

  watch: {
    thresholdValue(val) {
      this.initData()
    },

    options: {
      handler(data) {}
    },
    configData: {
      handler(val) {
        switch (val.yType) {
        case 'per':
          this.YName = '使用率'
          this.unit = '%'
          break
        case 'sec':
          this.YName = '秒'
          this.unit = 's'
          break
        }
      },
      immediate: true
    }
  },

  data() {
    return {
      YName: '',
      unit: '',
      // 图表基础信息
      lineData: {
        tooltip: {
          trigger: 'axis',
          formatter: this.tooltipFormatter
        },
        grid: {
          top: '16%',
          left: '45',
          right: '2%',
          bottom: '38px',
          containLabel: false
        },
        legend: {
          show: false
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff', //更改坐标轴文字颜色
              fontSize: 12 //更改坐标轴文字大小
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#C1CEF9' //更改坐标轴颜色
            }
          }
        },
        yAxis: {
          type: 'value',
          // name: '使用率（%）',
          // Y轴分隔线
          splitLine: {
            show: true,
            lineStyle: {
              color: '#C1CEF9',
              opacity: 0.27
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff', //更改坐标轴文字颜色
              fontSize: 12 //更改坐标轴文字大小
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#C1CEF9' //更改坐标轴颜色
            }
          },
          axisTick: {
            show: false
          },
          // 修改Y轴坐标名称
          axisLabel: {
            margin: 5,
            // 后缀
            formatter: this.axisLabelFormatter
          },
          nameTextStyle: {
            align: 'left',
            padding: [0, 0, 5, -40],
            color: '#B6BECE'
          },
          max: function(value) {
            // 最多取两位小数
            let maxValue = Math.round( value.max * 100 ) / 100
            // 解决精度问题
            if (maxValue === 0.2) return Math.round( (maxValue + 0.1) * 100 ) / 100
            return maxValue < 1 ? maxValue + 0.1 : maxValue + 1
          },
          min: function(value) {
            // 最多取两位小数
            let minValue = Math.round( value.min * 100 ) / 100
            
            // 处理精度问题
            if (minValue === 0.3 || minValue === 0.4) {
              return Math.round( (minValue - 0.1) * 100 ) / 100
            }

            const minVal = minValue < 1 ? minValue - 0.1 : minValue - 1
            return minVal < 0 ? 0 : minVal
          }
        },
        // 视觉映射,用于数据分段展示
        visualMap: {
          show: false,
          pieces: [
            {
              gt: 0,
              lte: 70,
              color: '#4DAF63'
            }
          ]
          //{
          //     gt: 0.5,
          //     lte: 2,
          //     color: '#FF4F4F'
          // }],
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: false,
            connectNulls: false // 是否链接空值
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0], //表示x轴折叠
            state: 1,
            end: 100,
            top: 'bottom',
            realtime: true,
            fillerColor: 'rgba(160,206,255,0.2)',
            borderColor: 'rgba(160,206,255,0.2)',
            backgroundColor: 'rgba(61,87,130, 0.4)',
            dataBackground: {
              lineStyle: {
                // 折线样式
                color: 'rgba(99,177,252, 0.6)',
                width: 1,
                opacity: 0.9
              },
              areaStyle: {
                color: '#A0CEFF'
              }
            },
            textStyle: {
              color: '#fff'
            }
          }
        ]
      }
    }
  },

  components: {
    'v-chart': ECharts
  },

  methods: {
    // 提示框
    tooltipFormatter(param) {
      let _html =
        '<div style="padding: 3px;font-size: 12px;">' +
        '时间：' +
        param[0].axisValue +
        '<br/>' +
        this.YName +
        ': ' +
        param[0].value +
        ' ' +
        this.unit +
        '<br/>'
      // 状态显示
      if (this.thresholdValue) {
        _html += '状态：'
        if (+this.thresholdValue <= +param[0].value) {
          _html += '<span class="status-circle warning-color"></span>'
        } else {
          _html += '<span class="status-circle"></span>'
        }
      }
      _html += '</div>'
      return _html
    },

    axisLabelFormatter(value = '-') {
      return value + this.unit
    },

    initData() {
      let seriesData = []
      let xAxisData = []

      this.options.forEach(e => {
        if (e.PERCENTAGE === null) {
          e.PERCENTAGE = '-' // null值改成 -，默认为0
        } else {
          // 保留三位小数
          e.PERCENTAGE = Number(e.PERCENTAGE).toFixed(2)
        }
        let xDate = formatDate(e.ZONETIME, 'hh:mm')
        xAxisData.push(xDate)
        seriesData.push(+e.PERCENTAGE)
      })

      this.lineData.yAxis.name = this.name + '(' + this.YName + ')'
      this.lineData.xAxis.data = xAxisData
      this.$set(this.lineData.xAxis, 'data', xAxisData)
      this.$set(this.lineData.series[0], 'data', seriesData)

      // 阈值显示处理
      this.lineData.visualMap.pieces[0].lte = +this.thresholdValue ? +this.thresholdValue : 70
      const obj = {
        gt: +this.thresholdValue || 70,
        lte: 100,
        color: '#FFA65D'
      }
      this.lineData.visualMap.pieces[1] = obj
    }
  }
}
</script>

<style lang="less" scoped>
.line-charts {
  width: 100%;
  height: 100%;
}
</style>

<style>
.status-circle {
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 100px;
  background: #4daf63;
}
.warning-color {
  background: #ffa65d;
}
</style>
