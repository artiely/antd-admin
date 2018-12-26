import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'

export const messages = {
  en: {
    message: {
      hello: 'hello world',
      dashboard: 'dashboard',
      workplace: 'workplace',
      analysis: 'analysis',
      form: 'form',
      basic: 'basic',
      step: 'step',
      advanced: 'advanced'
    }
  },
  cn: {
    message: {
      hello: '你好、世界',
      dashboard: '仪表盘',
      workplace: '工作台',
      analysis: '分析页',
      form: '表单',
      basic: '基础表单',
      step: '步进表单',
      advanced: '高级表单'
    }
  }
}
Vue.use(VueI18n)
let loacle = 'en'
if (store.state.sys.language.label === 'English') {
  loacle = 'cn'
} else {
  loacle = 'en'
}
const i18n = new VueI18n({
  locale: loacle, // set locale
  messages // set locale messages
})
export default i18n
