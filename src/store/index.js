import Vue from 'vue'
import Vuex from 'vuex'
import data_pool from './data_pool'
import api from './api'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    // 数据池
    data_pool,
    // api相关
    api
    // storage
    // page
  },
  strict: process.env.NODE_ENV !== 'production'
})
