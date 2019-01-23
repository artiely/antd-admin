export const lazyLoading = path => {
  return () => {
    // clearTimeout(timer)
    // let toast = Toast.loading({
    //   duration: 0, // 持续展示 toast
    //   forbidClick: true, // 禁用背景点击
    //   message: '跳转中...'
    // })
    // timer = setTimeout(() => {
    //   if (toast) {
    //     toast = notification.warning({
    //       message: '网络不太稳定...'
    //     })
    //   }
    // }, 10000)
    return import(`@/${path}`)
      .then(component => {
        return component
      })
      .catch(() => {
        console.error('获取页面失败')
        window.location.reload()
      })
      .finally(() => {
        // notification.close(toast)
        // toast = null
      })
  }
}
