import fetch from '../fetch'

const MENU_LIST = params => {
  return fetch({
    url: '/sys/menu/list',
    method: 'get',
    params: params,
  })
}

const MENU_NAV = params => {
  return fetch({
    url: '/sys/menu/nav',
    method: 'get',
    params: params,
  })
}

const MENU_INFO = params => {
  return fetch({
    url: '/sys/menu/info',
    method: 'get',
    params: params,
  })
}

const MENU_SELECT = params => {
  return fetch({
    url: '/sys/menu/select',
    method: 'get',
    params: params,
  })
}

const MENU_SAVE = params => {
  return fetch({
    url: '/sys/menu/save',
    method: 'post',
    data: params,
  })
}

const MENU_UPDATE = params => {
  return fetch({
    url: '/sys/menu/update',
    method: 'post',
    data: params,
  })
}

const MENU_DELETE = params => {
  return fetch({
    url: '/sys/menu/delete',
    method: 'post',
    params: params,
  })
}

const apiMenu = {
  MENU_LIST,
  MENU_NAV,
  MENU_INFO,
  MENU_SELECT,
  MENU_SAVE,
  MENU_UPDATE,
  MENU_DELETE,
}

export default apiMenu
