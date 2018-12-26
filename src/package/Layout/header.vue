<template>
  <a-layout-header class="layout-header" :class="{'layout-header-dark': headerTheme==='dark'}">
    <!-- trigger s -->
    <a-icon class="trigger" :type="isCollapse ? 'menu-unfold' : 'menu-fold'" @click="handleClick"/>
    <!-- trigger e -->
    <slot/>
  </a-layout-header>
</template>

<script>
export default {
  name: 'v-header',
  computed: {
    isCollapse() {
      return this.$store.state.sys.isCollapse
    },
    headerTheme() {
      return this.$store.state.sys.headerTheme
    },
  },
  methods: {
    handleClick() {
      this.$store.commit('sys/changeCollapse', !this.isCollapse)
    },
  },
}
</script>
<style lang="less">
.layout-header {
  box-shadow: 4px 4px 40px 0 rgba(0, 0, 0, 0.05);
  z-index: 99;

  &.ant-layout-header {
    background: #fff;
    padding: 0;
  }
  &.layout-header-dark {
    &.ant-layout-header {
      background: #002140;
    }
    color: #fff !important;
    .ant-badge {
      color: #fff !important;
    }
    .header-action {
      font-size: 18px;
      line-height: 64px;
      padding: 0 15px;
      cursor: pointer;
      transition: color 0.3s;
      height: 100%;
      &:hover,
      &:focus {
        color: #1890ff;
        background: #000c17;
      }
    }
  }
  .header-action {
    font-size: 18px;
    line-height: 64px;
    padding: 0 15px;
    cursor: pointer;
    transition: color 0.3s;
    height: 100%;
    &:hover,
    &:focus {
      color: #1890ff;
      background: #e6f7ff;
    }
  }
}
</style>
