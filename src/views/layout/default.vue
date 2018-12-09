<template>
  <a-layout id="components-layout-demo-custom-trigger" :class="{'layout-fixed':layoutFixed}">
    <drawer-sider-menu></drawer-sider-menu>
    <a-layout>
      <v-header/>
      <v-content/>
    </a-layout>
    <drawer-setting></drawer-setting>
  </a-layout>
</template>
<script>
import header from './header'
import content from './content'
import drawerSiderMenu from './drawerSiderMenu'
import drawerSetting from './drawerSetting'
const NAV_TABS_HEIGHT = 45
let HEADER_HEIGTH = 64
export default {
  components: {
    'v-header': header,
    'v-content': content,
    drawerSiderMenu,
    drawerSetting
  },
  data() {
    return {
      timer: null
    }
  },
  computed: {
    // documentClientHeight: {
    //   get() {
    //     return this.$store.state.sys.documentClientHeight
    //   },
    //   set(val) {
    //     this.$store.commit('sys/updateClientHeight', val)
    //   }
    // },
    documentClientBodyHeight: {
      get() {
        return this.$store.state.sys.documentBodyClientHeight
      },
      set(val) {
        this.$store.commit('sys/updateClientBodyHeight', val)
      }
    },
    layoutFixed() {
      return this.$store.state.sys.layoutFixed
    }
  },
  methods: {
    // 重置窗口可视高度
    // resetDocumentClientHeight() {
    //   this.documentClientHeight =
    //     document.documentElement['clientHeight'] -
    //     HEADER_HEIGTH -
    //     NAV_TABS_HEIGHT
    //   window.onresize = () => {
    //     clearInterval(this.timer)
    //     this.timer = setTimeout(() => {
    //       this.documentClientHeight =
    //         document.documentElement['clientHeight'] -
    //         HEADER_HEIGTH -
    //         NAV_TABS_HEIGHT
    //     }, 400)
    //   }
    // },
    resetDocumentBodyClientHeight() {
      this.documentClientBodyHeight =
        document.body['clientHeight'] - HEADER_HEIGTH - NAV_TABS_HEIGHT
      window.onresize = () => {
        clearInterval(this.timer)
        this.timer = setTimeout(() => {
          this.documentClientBodyHeight =
            document.body['clientHeight'] - HEADER_HEIGTH - NAV_TABS_HEIGHT
        }, 400)
      }
    }
  },
  mounted() {
    // this.resetDocumentClientHeight()
    this.resetDocumentBodyClientHeight()
  }
}
</script>
<style lang="less">
.ant-layout {
  height: 100%;
}
#components-layout-demo-custom-trigger {
  &.layout-fixed {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
  }
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
</style>
