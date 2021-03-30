import Vue from 'vue'
import Vuex from 'vuex'
import globolModules from './globolModues'

Vue.use(Vuex)

export default (pageModules) => new Vuex.Store({
  modules: {
    ...globolModules,
    ...pageModules
  }
})
