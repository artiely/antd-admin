<template>
  <keep-alive>
    <a-drawer
      wrapClassName="my-draw-menu"
      v-if="isMobile"
      :visible="!isCollapse"
      :closable="false"
      getContainer="body"
      maskClosable
      placement="left"
      @close="handleChange"
    >
      <v-menu></v-menu>
    </a-drawer>
    <sider-menu v-else/>
  </keep-alive>
</template>

<script>
import siderMenu from './siderMenu'
import vMenu from './menu'
export default {
  name: 'drawerSiderMenu',
  components: {
    siderMenu,
    vMenu,
  },
  data() {
    return {
      collapsedWidth: 0,
      visible: true,
      logo: '123',
    }
  },
  computed: {
    isCollapse: {
      get: function() {
        return this.$store.state.sys.isCollapse
      },
      set: function(val) {
        this.$store.commit('sys/changeCollapse', val)
      },
    },
    isMobile() {
      return this.$store.state.sys.isMobile
    },
  },
  methods: {
    handleChange(val) {
      this.$store.commit('sys/changeCollapse', true)
    },
    _mediaQuery() {
      let self = this
      var EventUtil = {
        addHandler: function(element, type, handler) {
          if (element.addEventListener) {
            element.addEventListener(type, handler, false)
          } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler)
          } else {
            element['on' + type] = handler
          }
        },
      }
      var mediaQuery = {
        init: function() {
          var _this = this
          var timer = null
          _this.outputSize()
          EventUtil.addHandler(window, 'resize', function() {
            clearTimeout(timer)
            timer = setTimeout(() => {
              _this.outputSize()
            }, 800)
          })
        },
        outputSize: function() {
          /**
           * 首先判断设备屏幕尺寸
           * 如果是小屏幕 sys/changeCollapse = false sys/isMobile = true
           */
          var result1 = window.matchMedia('(min-width:1200px)')
          var result2 = window.matchMedia('(min-width:992px)')
          var result3 = window.matchMedia('(min-width:768px)')
          if (result1.matches) {
            console.log('>=1200 大型设备 大台式电脑')
            self.$store.commit('sys/isMobile', false)
          } else if (result2.matches) {
            console.log('992=< <=1200 中型设备 台式电脑')
            self.$store.commit('sys/isMobile', false)
          } else if (result3.matches) {
            console.log('768<= <=992 小型设备 平板电脑')
            self.$store.commit('sys/isMobile', true)
          } else {
            console.log('<=768 超小设备 手机')
            self.$store.commit('sys/isMobile', true)
          }
        },
      }
      mediaQuery.init()
    },
  },
  mounted() {
    this._mediaQuery()
  },
}
</script>

<style lang="less">
.my-draw-menu {
  .ant-drawer-body {
    padding: 0;
  }
  .ant-drawer-content {
    background: #001529 !important;
  }
  .ant-drawer-wrapper-body {
  }
}
</style>
