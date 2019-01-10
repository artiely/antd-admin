import fetch from '../fetch'

const ROLE_LIST = params => {
  return fetch({
    url: '/sys/role/list',
    method: 'get',
    params: params,
  })
}

const ROLE_INFO = params => {
  return fetch({
    url: '/sys/role/info',
    method: 'get',
    params: params,
  })
}

const ROLE_SELECT = params => {
  return fetch({
    url: '/sys/role/select',
    method: 'get',
    params: params,
  })
}

const ROLE_SAVE = params => {
  return fetch({
    url: '/sys/role/save',
    method: 'post',
    data: params,
  })
}

const ROLE_UPDATE = params => {
  return fetch({
    url: '/sys/role/update',
    method: 'post',
    data: params,
  })
}

const ROLE_DELETE = params => {
  return fetch({
    url: '/sys/role/delete',
    method: 'post',
    params: params,
  })
}

const apiRole = {
  ROLE_LIST,
  ROLE_INFO,
  ROLE_SELECT,
  ROLE_SAVE,
  ROLE_UPDATE,
  ROLE_DELETE,
}

export default apiRole
