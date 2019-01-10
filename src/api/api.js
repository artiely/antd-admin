import apiAuth from './modules/auth'
import apiUser from './modules/user'
import apiRole from './modules/role'
import apiMenu from './modules/menu'
const apiList = {
  ...apiAuth,
  ...apiUser,
  ...apiRole,
  ...apiMenu
}

export default apiList
