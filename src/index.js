import components from './components'
import packages from './package'
// import AlloyFinger from 'alloyfinger'
// import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger.vue'
import 'normalize.css'
let widget = { ...components,
  ...packages
}
const install = (Vue) => {
  if (install.installed) return

  // Vue.use(AlloyFingerPlugin, {
  //   AlloyFinger
  // })

  for (let key in widget) {
    Vue.component(key, widget[key])
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
var obj = {}
Object.assign(obj, {
  install,
  ...widget
})
export default obj
