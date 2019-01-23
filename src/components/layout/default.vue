<template>
  <a-layout id="components-layout-demo-custom-trigger" :class="{'layout-fixed':layoutFixed}">
    <v-drawer-sider-menu>
    </v-drawer-sider-menu>
    <a-layout>
      <v-header>
        <cb-top-content></cb-top-content>
      </v-header>
      <v-content/>
    </a-layout>
    <cb-drawer-setting></cb-drawer-setting>
  </a-layout>
</template>
<script>

const NAV_TABS_HEIGHT = 45
let HEADER_HEIGTH = 64
export default {
  data() {
    return {
      logo: '123',
      timer: null
    }
  },
  computed: {
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
