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
  // 全部可选的角色
  roleSelect: [],
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
  getMenuNav({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.MENU_NAV().then(res => {
        if (res.code === 0) {
          let permissions = JSON.stringify(res.permissions || [])
          window.sessionStorage.setItem('permissions', permissions)
        }
        resolve(res)
      })
    })
  },
  getRoleSelect({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.ROLE_SELECT().then(res => {
        if (res.code === 0) {
          state.roleSelect = res.list.map(v=>{
            let {roleName:label,roleId:value} = v
            return {label,value}
          })
          console.log('state.roleSelect',state.roleSelect)
        }
        resolve(res,state.roleSelect)
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
