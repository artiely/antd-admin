<template>
  <a-layout-sider collapsible :trigger="null" :collapsedWidth="collapsedWidth" v-model="isCollapse" width="256px" :class="{'drawer-layout-sider':isMobile, 'drawer-layout-light':menuTheme==='light'}">
    <v-menu></v-menu>
  </a-layout-sider>
</template>

<script>
// import Cookies from 'js-cookie'
import vMenu from './menu'
export default {
  components: {
    vMenu
  },
  name: 'sider-menu',
  props: {
    collapsedWidth: {
      type: Number,
      default: 80
    }
  },
  computed: {
    menuTheme() {
      return this.$store.state.sys.menuTheme
    },
    isMobile() {
      return this.$store.state.sys.isMobile
    },
    isCollapse: {
      get: function() {
        return this.$store.state.sys.isCollapse
      },
      set: function() {}
    }
  }
}
</script>

<style lang="less">
#components-layout-demo-custom-trigger .ant-layout-sider {
  box-shadow: 4px 40px 4px 0px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 10;
  background: #001529;
  transition: all 0.3s;
  &.drawer-layout-sider {
    height: 100%;
  }
  &.drawer-layout-light {
    background: #fff;
    transition: all 0.3s;
    .logo {
      background: #fff;
      h1 {
        color: #001529;
      }
    }
  }
}
</style>
