import api from '@/api/api'
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
  getUserInfo({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.USER_INFO(payload).then(res => {
        // 把数据处理成tree需要的数据
        resolve(res)
      })
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
