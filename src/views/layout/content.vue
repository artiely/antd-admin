<template>
  <a-layout-content :style="fixedMenuStyle">
    <a-tabs v-if="navTabs.length>0 && isTabMode" class="header-tabs" :activeKey="activeTab" defaultActiveKey="1" tabPosition="top" :tabBarGutter="4" :animated="false" :tabBarStyle="{'background':'#f0f2f5','margin':'0'}">
      <a-tab-pane :key="item.path" v-for="item in navTabs">
        <span slot="tab" class="header-tab">
          <span @click="change(item.path)">{{item.meta.title}}</span>
          <a-icon type="close" v-if="navTabs.length!==1" style="position:relative;margin-right:-10px;margin-left:6px;width:14px;height:14px;display:inline-block;color:rgba(0,0,0,.45)" @click="removeTab(item)" />
        </span>
      </a-tab-pane>
      <div style="height:44px;width:44px;text-align:center;background:#f0f0f0;cursor:pointer" slot="tabBarExtraContent">
        <a-dropdown>
          <a class="ant-dropdown-link" href="#">
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay" class="my-tabs-drapdowm">
            <a-menu-item @click.native="closeCurrTag">
              <a href="javascript:;">关闭当前标签页</a>
            </a-menu-item>
            <a-menu-item @click.native="closeOtherTag">
              <a href="javascript:;">关闭其他标签页</a>
            </a-menu-item>
            <a-menu-item @click.native="closeAllTag">
              <a href="javascript:;">关闭全部标签页</a>
            </a-menu-item>
            <a-menu-item @click.native="refreshCurrTag">
              <a href="javascript:;">刷新当前标签页</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </a-tabs>
    <div style="padding:5px 20px;" v-if="!activeTabObj.type" :style="fixedStyle">
      <a-breadcrumb style="margin:0 0 10px 0" v-if="breadcrumbMode">
        <a-breadcrumb-item v-for="item in $route.matched" :key="item.path">
          <span v-if="item.name=='Home'">
            <a-icon type="home" /> 首页
          </span>
          <a-icon :type="item.meta.icon" v-else/>
          <span>
            {{item.meta.title}}
          </span>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <slide-y-down-transition>
        <router-view />
      </slide-y-down-transition>
      <a-layout-footer style="text-align: center">
        Ant Design ©2016 Created by Ant UED
      </a-layout-footer>
    </div>

  </a-layout-content>
</template>

<script>
import { SlideYDownTransition } from 'vue2-transitions'
import { mapState } from 'vuex'
const NAV_TABS_HEIGHT = 45
export default {
  components: {
    SlideYDownTransition
  },
  computed: {
    fixedStyle() {
      if (this.$store.state.sys.layoutFixed) {
        let tabsHeight = this.$store.state.sys.isTabMode ? 0 : NAV_TABS_HEIGHT
        return {
          height: this.documentBodyClientHeight + tabsHeight + 'px',
          'overflow-y': 'scroll'
        }
      } else {
        return { height: 'auto' }
      }
    },
    fixedMenuStyle() {
      if (this.$store.state.sys.fixedMenu) {
        return {
          height: this.documentBodyClientHeight + 'px',
          padding: 0
        }
      } else {
        return {
          padding: 0,
          'min-height': this.documentBodyClientHeight + NAV_TABS_HEIGHT + 'px'
        }
      }
    },
    ...mapState('sys', {
      navTabs: state => state.navTabs,
      layoutFixed: state => state.layoutFixed,
      breadcrumbMode: state => state.breadcrumbMode,
      activeTab: state => state.activeTab,
      isTabMode: state => state.isTabMode
    }),
    documentBodyClientHeight: {
      get() {
        if (this.$store.state.sys.navTabs) {
          return this.$store.state.sys.documentBodyClientHeight
        }
        return this.$store.state.sys.documentBodyClientHeight + NAV_TABS_HEIGHT
      },
      set() {}
    },
    activeTabObj() {
      return this.$store.getters['sys/activeTabObj']
    }
  },
  watch: {
    activeTab: {
      handler(val) {
        this.$router.push(val)
      }
    }
  },
  methods: {
    setIframeHeight(iframe) {
      if (iframe) {
        var iframeWin =
          iframe.contentWindow || iframe.contentDocument.parentWindow
        if (iframeWin.document.body) {
          iframe.height =
            iframeWin.document.documentElement.scrollHeight ||
            iframeWin.document.body.scrollHeight
        }
      }
    },
    change(val) {
      this.$store.commit('sys/setActiveTab', val)
    },
    removeTab(val) {
      if(this.navTabs.length===1) return
      this.$store.commit('sys/removeTag', val)
    },
    closeCurrTag() {
      this.$store.commit('sys/closeCurrTag')
    },
    closeOtherTag() {
      this.$store.commit('sys/closeOtherTags')
    },
    closeAllTag() {
      this.$store.commit('sys/closeAlltags')
    },
    refreshCurrTag() {
      // 创建临时变量保存当前的activeTag 然后删除当前 再添加临时变量
      this.$store.commit('sys/setCurrTag')
      this.$nextTick(() => {
        this.$store.commit('sys/refreshCurrTag')
      })
    }
  },
  created() {
    this.iframeHeight = document.body.clientHeight
    console.log(this.iframeHeight)
    window.onresize = function() {
      this.iframeHeight = document.body.clientHeight
      console.log(this.iframeHeight)
    }
    this.$store.dispatch('sys/getMenuNav')
    this.$store.dispatch('sys/getMenuList')
  }
}
</script>

<style lang="less">
.my-tabs-drapdowm {
  &.ant-dropdown-menu {
    border-radius: 2px !important;
  }
}
.header-tabs {
  background: #f0f2f5;
  box-shadow: 4px 4px 40px 0 rgba(0, 0, 0, 0.05);
  z-index: 90;
  .ant-tabs-nav .ant-tabs-tab-active {
    background: #fff !important;
    color: #1890ff !important;
  }
  > .ant-tabs-bar {
    border: none;
  }
  > .ant-tabs-bar .ant-tabs-tab {
    margin-right: 4px !important;
    background: #fafafa;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    color: #666;
    font-size: 14px;
    font-weight: 500;
  }
  .ant-tabs-ink-bar{
    background: transparent;
  }
}
.header-tab {
  position: relative;
  .anticon {
    &:hover {
      background: #ddd !important;
    }
  }
}
</style>
