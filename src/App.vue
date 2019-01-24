<template>
  <a-locale-provider :locale="local">
    <div id="app" :style="fixedMenuStyle">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import Cookie from 'js-cookie'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zh_TW from 'ant-design-vue/lib/locale-provider/zh_TW'
import en_US from 'ant-design-vue/lib/locale-provider/en_US'
let language = Cookie.get('language')
let local = zh_CN
if (language === 'zh_CN') {
  local = zh_CN
} else if (language === 'zh_TW') {
  local = zh_TW
} else if (language === 'en_US') {
  local = en_US
}
export default {
  name: 'App',
  data() {
    return {
      local,
    }
  },
  computed: {
    fixedMenu() {
      return this.$store.state.sys.menuFixed
    },
    language() {
      return this.$store.state.sys.language
    },
    fixedMenuStyle() {
      if (this.$store.state.sys.menuFixed) {
        return {
          height: '100%',
        }
      } else {
        return {
          height: 'auto',
        }
      }
    },
  },
  created() {
    let token = Cookie.get('token')
    if (!token) {
      this.$router.replace('/login')
    }
  },
}
</script>
