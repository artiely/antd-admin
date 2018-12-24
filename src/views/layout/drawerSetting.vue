<template>
  <v-drawer :isCollapse="settingVisible" placement="right" @change="close">
    <div class="drawer-setting-wrapper">
      <a-icon
        type="close-circle"
        style="font-size:24px;color:#666;cursor:pointer"
        class="pull-right"
        @click="close"
      />
      <a-divider orientation="left">布局风格</a-divider>
      <v-cell title="顶部导航主题" mode="switch" v-model="headerTheme" left-icon-symbol="icon-daohang"></v-cell>
      <v-cell title="菜单主题" mode="switch" v-model="menuTheme" left-icon-symbol="icon-caidan"></v-cell>
      <v-cell title="标签页模式" mode="switch" v-model="isTabMode" left-icon-symbol="icon-biaoqian1"></v-cell>
      <v-cell
        title="面包屑模式"
        mode="switch"
        v-model="breadcrumbMode"
        left-icon-symbol="icon-bread"
        tip="在iframe下无效"
      ></v-cell>
      <v-cell
        title="固定布局模式"
        mode="switch"
        v-model="layoutFixed"
        left-icon-symbol="icon-yemiantoubu"
      ></v-cell>
      <v-cell
        title="固定菜单模式"
        mode="switch"
        :disabled="layoutFixed"
        v-model="menuFixed"
        left-icon-symbol="icon-caidanfenlei"
        disabledTip="在流式布局下有效"
      ></v-cell>
      <v-cell title="色弱模式" mode="switch" left-icon-symbol="icon-duibi"></v-cell>
      <v-cell title="清理缓存" mode="switch" left-icon-symbol="icon-qingchugeshi" v-model="chache"></v-cell>
      <!-- <v-icon name="icon-qingchugeshi"></v-icon>
      <v-icon name="icon-daohang" symbol></v-icon>-->
      <!-- <v-cell title="内联菜单模式" mode="switch" v-model="menuMode"></v-cell> -->
    </div>
  </v-drawer>
</template>
<script>
export default {
  data() {
    return {
      radioStyle: {
        height: '30px',
        width: '100px',
        lineHeight: '30px',
      },
      tabMode: true,
      chache: false,
    }
  },
  watch: {
    chache() {
      window.localStorage.clear()
      this.$message.success('清除成功！')
    },
  },
  computed: {
    settingVisible() {
      return this.$store.state.sys.settingVisible
    },
    layoutFixed: {
      get() {
        return this.$store.state.sys.layoutFixed
      },
      set(val) {
        this.$store.commit('sys/layoutFixed', val)
      },
    },
    menuFixed: {
      get() {
        return this.$store.state.sys.menuFixed
      },
      set(val) {
        this.$store.commit('sys/menuFixed', val)
      },
    },
    menuTheme: {
      get() {
        return this.$store.state.sys.menuTheme === 'light'
      },
      set(val) {
        this.$store.commit('sys/changeMenuTheme', val)
      },
    },
    headerTheme: {
      get() {
        return this.$store.state.sys.headerTheme === 'light'
      },
      set(val) {
        this.$store.commit('sys/changeHeaderTheme', val)
      },
    },
    menuMode: {
      get() {
        return this.$store.state.sys.menuMode === 'inline'
      },
      set(val) {
        this.$store.commit('sys/changheMenuMode', val)
      },
    },
    breadcrumbMode: {
      get() {
        return this.$store.state.sys.breadcrumbMode
      },
      set(val) {
        this.$store.commit('sys/breadcrumbMode', val)
      },
    },
    isTabMode: {
      get() {
        return this.$store.state.sys.isTabMode
      },
      set(val) {
        this.$store.commit('sys/changeTabMode', val)
      },
    },
  },
  methods: {
    close() {
      this.$store.commit('sys/settingVisible')
    },
  },
  mounted() {},
}
</script>
<style>
.drawer-setting-wrapper {
  padding: 20px;
  width: 266px;
  background: #fff;
}
</style>
