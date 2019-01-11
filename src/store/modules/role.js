/**
 * 系统store
 * 主要包含布局主题语音等
 */
import api from '@/api/api'
import { treeDataTranslate } from '../../utils/index'
// initial state
const state = {
  // 当前登陆者的权限菜单
  menuList: [],
}

// getters
const getters = {}

// mutations
const mutations = {}

// actions
const actions = {
  getMenuList({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.MENU_LIST().then(res => {
        // 把数据处理成tree需要的数据
        let treeArr = res.map(v => {
          return {
            title: v.name,
            key: v.menuId,
            parentId: v.parentId,
          }
        })
        state.menuList = treeDataTranslate(treeArr, 'key')
        console.log('state.menuList ', state.menuList)
        resolve(res, state.menuList)
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
