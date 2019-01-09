import fetch from '../fetch'
import BASE_URL from '../config.js'

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

const CAPTCHA = () => {
  return BASE_URL + '/captcha.jpg?uuid='
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

const apiAuth = {
  LOGIN,
  CAPTCHA,
  UPDATE_PASSWORD,
  MENU_NAV,
  USER_INFO,
  MENU_LIST
}

export default apiAuth