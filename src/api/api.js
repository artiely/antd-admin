import fetch from './fetch'

/**
 * 登录
 * @param {String} username
 * @param {String} password
 */
const LOGIN = params => {
  return fetch({
    url: '/sys/login',
    method: 'post',
    data: params
  })
}
var isProduction = process.env.NODE_ENV === 'production'
const baseURL = isProduction ? 'http://182.61.137.53:9003/ucar' : '/ucar'
const CAPTCHA = () => {
  return baseURL + '/captcha.jpg?uuid='
}

/**
 * 修改密码
 * @param {String} password
 * @param {String} newPassword
 */
const USER_INFO = params => {
  return fetch({
    url: '/sys/user/info',
    method: 'get',
    params: params
  })
}

/**
 * 修改密码
 * @param {String} password
 * @param {String} newPassword
 */
const UPDATE_PASSWORD = params => {
  return fetch({
    url: '/sys/user/password',
    method: 'post',
    data: params
  })
}

/**
 * 导航菜单列表
 * @param {String} password
 * @param {String} newPassword
 */
const MENU_NAV = params => {
  return fetch({
    url: '/sys/menu/nav',
    method: 'get',
    params: params
  })
}

/**
 * 导航菜单列表
 * @param {String} password
 * @param {String} newPassword
 */
const MENU_LIST = params => {
  return fetch({
    url: '/sys/menu/list',
    method: 'get',
    params: params
  })
}

const apiList = {
  LOGIN,
  CAPTCHA,
  UPDATE_PASSWORD,
  MENU_NAV,
  USER_INFO,
  MENU_LIST
}

export default apiList
