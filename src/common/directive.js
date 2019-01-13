import Vue from 'vue'
// 元素级别的权限
Vue.directive('isAuth', {
  bind: function(el, binding, vnode) {
    let isAuth =
      JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(binding.value) !==
        -1 || false
    if (!isAuth) {
      el.style.display = 'none'
    }
    console.log('isAuth',isAuth)
  },
  update: function(el, binding, vnode) {
    let isAuth =
      JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(binding.value) !==
        -1 || false
    if (!isAuth) {
      el.style.display = 'none'
    }
    console.log('isAuth',isAuth)
  },
})
