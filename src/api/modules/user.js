import fetch from '../fetch'

const USER_LIST = params => {
  return fetch({
    url: '/sys/user/list',
    method: 'get',
    params: params,
  })
}

const USER_INFO = params => {
  return fetch({
    url: `/sys/user/info/${params.userId}`,
    method: 'get',
    params: params,
  })
}

const USER_PASSWORD = params => {
  return fetch({
    url: '/sys/user/password',
    method: 'post',
    data: params,
  })
}

const USER_SAVE = params => {
  return fetch({
    url: '/sys/user/save',
    method: 'post',
    data: params,
  })
}

const USER_UPDATE = params => {
  return fetch({
    url: '/sys/user/update',
    method: 'post',
    data: params,
  })
}

const USER_DELETE = params => {
  return fetch({
    url: '/sys/user/delete',
    method: 'post',
    params: params,
  })
}

const apiUser = {
  USER_LIST,
  USER_INFO,
  USER_PASSWORD,
  USER_SAVE,
  USER_UPDATE,
  USER_DELETE,
}

export default apiUser
