import Vue from 'vue'
import Vuex from 'vuex'
import sys from './modules/sys'
import role from './modules/role'

import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    sys,
    role
    // permission
  },
  plugins: [
    createLogger(),
    createPersistedState({
      key: '版本号',
      storage: window.sessionStorage
    })
  ]
})
export default store
