import Vue from 'vue'
// css reset
import 'normalize.css'

import Store from './store'

// 使用element-ui,按需引入
import 'element-ui/lib/theme-chalk/index.css'
import './element'

import 'xe-utils'
import VXETable from 'vxe-table'

Vue.use(VXETable)

export default ({ router, states = {}, App }, resolve = () => {}) => {
  const store = Store(states)

  const app = new Vue({
    store,
    router,
    render: (h) => h(App)
  }).$mount('#app')

  // 回调函数
  resolve(app)
}