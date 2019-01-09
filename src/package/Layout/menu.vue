<template>
  <div>
    <div class="logo">
      <cb-logo></cb-logo>
    </div>
    <!-- @click="handleMenu" -->
    <a-menu
      @click="handleMenu"
      :selectedKeys="activeTab"
      :defaultSelectedKeys="defaultPath"
      :mode="menuMode"
      :theme="menuTheme"
      :openKeys="openKeys"
      @openChange="onOpenChange"
    >
      <template v-for="item in menu">
        <!-- 有子菜单的菜单 排除隐藏的-->
        <a-sub-menu :key="item.path" v-if="!item.meta.hidden && item.children" :obj="item">
          <!-- 一级菜单 -->
          <span slot="title">
            <a-icon :type="item.meta.icon" v-if="item.meta.icon"/>
            <span>{{item.meta.title}}</span>
          </span>
          <!-- 二级菜单 -->
          <template v-for="sub in item.children">
            <a-menu-item v-if="!sub.meta.hidden" :key="sub.path" :obj="sub">
              <a-icon :type="sub.meta.icon" v-if="sub.meta.icon"/>
              {{sub.meta.title}}
            </a-menu-item>
          </template>
        </a-sub-menu>
        <!-- 没有子菜单的一级菜单 排除隐藏的-->
        <a-menu-item v-else-if="!item.meta.hidden" :key="item.path" :obj="item">
          <a-icon :type="item.icon"/>
          <span>{{item.meta.title}}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { mapState } from 'vuex'
import { setTimeout } from 'timers'
import { constantRouterMap } from '@/router'
export default {
  name: 'v-menu',
  props: {
    collapsedWidth: {
      type: Number,
      default: 80,
    },
  },
  data() {
    return {
      logo: '123',
      collapsed: false,
      defaultPath: [],
      openKeys: [],
    }
  },
  computed: {
    activeTab: {
      get: function() {
        return [this.$store.state.sys.activeTab]
      },
      set: function(val) {},
    },
    ...mapState('sys', {
      menu: state => state.menu,
      menuMode: state => state.menuMode,
      menuTheme: state => state.menuTheme,
      userInfo: state => state.userInfo,
      isMobile: state => state.isMobile,
      isCollapse: state => state.isCollapse,
    }),
  },
  watch: {
    $route: {
      handler(val) {
        if (this.isCollapse) {
          this.openKeys = []
        } else {
          this.openKeys = ['/' + this.$route.path.split('/')[1]]
        }
        // 设置tabsnav的内容    如果隐藏会添加到tabs但不会在菜单栏显示   但是有些我们都不希望
        let { path, name, meta } = val
        const findIndex = el => {
          return el.path === path
        }
        let hasConst = constantRouterMap.findIndex(findIndex) !== -1
        if (!meta.tabHidden && !hasConst) {
          this.$store.commit('sys/setNavTabMode', { path, name, meta })
        }
      },
    },
    isCollapse: {
      handler(val) {
        if (val) {
          this.openKeys = []
        } else {
          this.openKeys = ['/' + this.$route.path.split('/')[1]]
        }
        setTimeout(() => {
          var myEvent = new Event('resize')
          window.dispatchEvent(myEvent)
        }, 400)
      },
      immediate: true,
    },
  },
  methods: {
    handleMenu(item, key) {
      this.$router.push(item.key)
    },
    logout() {
      Cookies.remove('access_token')
      this.$router.replace('/login')
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      )
      let rootMenu = this.menu.map(v => v.path)
      if (rootMenu.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
  },
  mounted() {
    this.defaultPath = [this.$route.path]
    this.key = [this.$route.path]
    this.openKeys = ['/' + this.$route.path.split('/')[1]]
  },
}
</script>

<style lang="less">
.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: none !important;
}

.logo {
  height: 64px;
  position: relative;
  line-height: 64px;
  padding-left: 24px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  background: #002140;
  overflow: hidden;
  h1 {
    color: #fff;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
  }
  img {
    width: 32px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
