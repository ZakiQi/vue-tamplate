import API from '@/lib/services/index.js'

// 多维度单页vuex
export default {
  namespaced: true,

  state: {
    name: 'dimension',
    inspectionInfo: {}
  },

  actions: {
    // 获取简要信息数据
    getColonyInfo({ commit }, payoad = {}) {
      return API.post({
        url: '/inspection/inspectionStatusInfo',
        data: payoad
      }).then(e => {
        commit('SET_INSPECTION_INFO', e)
        return Promise.resolve(e)
      })
    }
  },

  mutations: {
    // 设置简要信息
    SET_INSPECTION_INFO (state, payoad) {
      state.inspectionInfo = payoad
    }
  }
}
