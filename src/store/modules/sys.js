// import * as types from '../mutation-types'
// import {
//   asyncRouterMap
// } from '@/router/index'
import Cookies from 'js-cookie'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import api from '@/api/api'
// initial state
const state = {
  /**
   * 布局
   */
  layoutFixed: true,
  menuFixed: false,
  isCollapse: false, // 控制菜单状态是否收起 true时收起
  settingVisible: true, // 设置
  isMobile: false, // 是否小屏
  // documentClientHeight: 0,
  documentBodyClientHeight: 0,
  /**
   * 权限
   */
  menu: null, // 菜单
  role: null, // 角色权限
  userInfo: null,
  /**
   * tab标签页
   */
  navTabs: [], // 标签栏
  isTabMode: true, // 是否是标签页模式
  activeTab: '',
  tempObj: {},
  currTabIndex: 0,
  breadcrumbMode: false,
  /**
   * 主题
   */
  menuMode: 'inline', // 菜单模式
  menuTheme: 'dark', // 菜单主题
  headerTheme: 'light', // header主题
  language: {
    label: 'Englist',
    value: zh_CN
  } // 语言
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param role
 * @param route
 */
// function hasPermission(role, route) {
//   if (route.meta && route.meta.role) {
//     return route.meta.role.indexOf(role) !== -1
//   } else {
//     return true
//   }
// }
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param role
 */
// function filterAsyncRouter(asyncRouterMap, role) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(role, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, role)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

// getters
const getters = {
  activeTabObj: state => {
    // 通过当前的路径计算当前的tab对象
    const findIndex = element => {
      return element.path === state.activeTab
    }
    let index = state.navTabs.findIndex(findIndex)
    if (index !== -1 && state.navTabs.length !== 0) {
      return state.navTabs[index]
    }
    return {}
  }
}

// mutations
const mutations = {
  /*
  菜单相关
  */
  changeCollapse(state, payload) {
    // 当前菜单收展状态
    state.isCollapse = payload
  },
  changheMenuMode(state, payload) {
    // 菜单模式
    state.menuMode = state.menuMode === 'vertical' ? 'inline' : 'vertical'
  },
  /**
   * 标签页相关
   */
  setNavTabMode(state, payload) {
    // 标签页数组模式
    state.activeTab = payload.path
    const findIndex = element => {
      return element.path === payload.path
    }
    let index = state.navTabs.findIndex(findIndex)
    if (index === -1) {
      state.navTabs.push(payload)
    }
  },
  setActiveTab(state, payload) {
    // 当前的path
    state.activeTab = payload
  },
  changeTabMode(state, payload) {
    // 是否开启tab模式
    state.isTabMode = payload ? Boolean(payload) : !state.isTabMode
  },
  setCurrTag(state, payload) {
    // 当前的tab对象
    // 保存临时变量
    const findIndex = element => {
      return element.path === state.activeTab
    }
    let index = state.navTabs.findIndex(findIndex)
    state.currTabIndex = index
    if (index !== -1 && state.navTabs.length !== 0) {
      state.tempObj = state.navTabs[index]
      state.navTabs.splice(index, 1)
      if (state.navTabs.length === 0) {
        state.activeTab = '/dashboard/analysis'
      } else {
        state.activeTab = state.navTabs[state.navTabs.length - 1].path
      }
    }
  },
  closeOtherTags(state, payload) {
    // 关闭其他标签
    state.navTabs = state.navTabs.filter(v => {
      return v.path === state.activeTab
    })
  },
  closeAlltags(state, payload) {
    // 关闭所有标签
    state.navTabs = []
  },
  refreshCurrTag(state, payload) {
    // 刷新当前标签
    state.navTabs.splice(state.currTabIndex, 0, state.tempObj)
    state.activeTab = state.tempObj.path
  },
  closeCurrTag(state, payload) {
    // 关闭当前标签
    const findIndex = element => {
      return element.path === state.activeTab
    }
    let index = state.navTabs.findIndex(findIndex)
    if (index !== -1) {
      state.navTabs.splice(index, 1)
      if (state.navTabs.length === 0) {
        state.activeTab = '/dashboard/analysis'
      } else {
        state.activeTab = state.navTabs[state.navTabs.length - 1].path
      }
    }
  },
  removeTag(state, payload) {
    // 移除某一个便签页不一定是当前页
    const findIndex = element => {
      return element.path === payload.path
    }
    let index = state.navTabs.findIndex(findIndex)
    if (index !== -1) {
      state.navTabs.splice(index, 1)
      if (state.navTabs.length === 0) {
        state.activeTab = '/dashboard/analysis'
      } else {
        state.activeTab = state.navTabs[state.navTabs.length - 1].path
      }
    }
  },
  breadcrumbMode(state, payload) {
    state.breadcrumbMode = payload || !state.breadcrumbMode
  },
  /*
  主题相关
  */
  changeHeaderTheme(state, payload) {
    // header主题
    state.headerTheme = state.headerTheme === 'dark' ? 'light' : 'dark'
  },
  changeMenuTheme(state, payload) {
    // 菜单主题
    state.menuTheme = state.menuTheme === 'dark' ? 'light' : 'dark'
  },
  /*
  设置收展状态
  */
  settingVisible(state, payload) {
    state.settingVisible = payload || !state.settingVisible
  },
  /*
  当前是否小屏
  */
  isMobile(state, payload) {
    state.isMobile = payload
  },
  /*
  布局
  */
  layout(state, payload) {
    state.layout = payload
    Cookies.set('layout', payload)
  },
  // updateClientHeight(state, payload) {
  //   state.documentClientHeight = payload
  // },
  updateClientBodyHeight(state, payload) {
    state.documentBodyClientHeight = payload
  },
  layoutFixed(state, payload) {
    state.layoutFixed = payload || !state.layoutFixed
  },
  menuFixed(state, payload) {
    state.menuFixed = payload || !state.menuFixed
  },
  /*
  当前菜单(主要是注销时清空)
  */
  setMenu(state, payload) {
    state.menu = payload
  },
  /*
  通过角色过滤出可展示的菜单
  如果是管理直接赋值
  否则过滤出符合角色的对应菜单
  目前每个用户只存在一种角色 如果业务不是如此需要修改**
  */
  filterRole(state, payload) {
    state.role = payload
    // state.menu = filterAsyncRouter(asyncRouterMap, payload)
  },
  // 设置语言
  setLanguage(state, payload) {
    state.language = payload
    state.navTabs = [] // 这里是为了解决navTabs 无法被翻译的问题 （FIXME: 可以重新匹配赋值）
    // window.localStorage.setItem('lang', payload)
    window.location.reload()
  },
  // 登陆者信息
  userInfo(state, payload) {
    state.userInfo = payload
  }
}

// actions
const actions = {
  getMenuNav({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.MENU_NAV().then(res => {
        console.log('当前的菜单列表', res)
        resolve()
      })
    })
  },
  getMenuList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.MENU_LIST().then(res => {
        console.log('当前的菜单列表2', res)
        resolve(res)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
