import api from '@/api/api'
import router from '@/router'
import Cookies from 'js-cookie'
// initial state
const state = {
  // 当前登陆者的权限菜单
  userInfo: [],
}

// getters
const getters = {}

// mutations
const mutations = {}

// actions
const actions = {
  // 登录并获取菜单及权限
  login({ commit, state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      api.LOGIN(payload).then(res => {
        if (res.code === 0) {
          resolve(res)
          Cookies.set('token', res.token)
          router.replace({ name: 'workplace' })
          dispatch('role/getMenuList', null, { root: true })
          dispatch('role/getMenuNav', null, { root: true })
        }
      })
    })
  },
  // 退出并清空tabBar
  logout({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      Cookies.remove('token')
      // 移除缓存
      console.log('process.env.VUE_APP_VERSION',process.env.VUE_APP_VERSION)
      window.sessionStorage.removeItem(process.env.VUE_APP_VERSION)
      router.replace('/login')
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
