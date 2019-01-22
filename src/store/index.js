import Vue from 'vue'
import Vuex from 'vuex'
import sys from './modules/sys'
import role from './modules/role'
import auth from './modules/auth'

import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    sys,
    role,
    auth
    // permission
  },
  plugins: [
    createLogger(),
    createPersistedState({
      // key = 应用前缀 + 版本号
      key: process.env.VUE_APP_VERSION,
      storage: window.sessionStorage
    })
  ]
})
export default store
