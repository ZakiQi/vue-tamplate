import ChartPie from './pie.vue'
import ChartBar from './bar.vue'
import ChartLine from './line.vue'

export const requireEcharts = () => import(/* webpackChunkName: "echarts" */ 'echarts')

export { ChartPie, ChartBar, ChartLine }
