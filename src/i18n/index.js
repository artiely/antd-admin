import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
/**
 * 
zh 中文 
zh_CN 中文 (中国) 
zh_HK 中文 (香港) 
zh_TW 中文 (台湾)
en 英文 
en_US 英文 (美国) 
 */
export const messages = {
  en_US: {
    menu: {
      dashboard: 'Dashboard',
      workplace: 'Workplace',
      analysis: 'Analysis',
      crud: 'CRUD',
      editor: 'Editor',
      management: 'Management',
      result_page: 'Result page',
      error_page: 'Error page',
      success: 'success',
      fail: 'fail',
      menu: 'menu',
      account: 'account',
      role: 'role',
      role_crud: 'role crud',
    },
  },
  zh_CN: {
    menu: {
      dashboard: '仪表盘',
      workplace: '工作台',
      analysis: '分析页',
      crud: '增删查改',
      editor: '编辑器',
      management: '系统管理',
      result_page: '结果页',
      error_page: '异常页',
      success: '成功',
      fail: '失败',
      menu: '菜单管理',
      account: '账号管理',
      role: '角色管理',
      role_crud: '角色 增删查改',
    },
  },
  zh_TW: {
    menu: {
      dashboard: '儀表盤',
      workplace: '工作臺',
      analysis: '分析頁',
      crud: '增刪查改',
      editor: '編輯器',
      management: '系統管理',
      result_page: '結果頁',
      error_page: '異常頁',
      success: '成功',
      fail: '失敗',
      menu: '菜單管理',
      account: '賬號管理',
      role: '角色管理',
      role_crud: '角色 增刪查改',
    },
  },
}
Vue.use(VueI18n)
let loacle = Cookies.get('language') || 'zh_CN'

const i18n = new VueI18n({
  locale: loacle, // set locale
  messages, // set locale messages
})
export default i18n
