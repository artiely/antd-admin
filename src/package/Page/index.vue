<template>
  <div>
    <a-icon type="redo"/>
    <!-- 只有缓存的页面才显示刷新，不缓存的没太大必要 -->
  </div>
</template>

<script>
export default {
  methods: {
    refresh() {
      this.$emit('refresh')
    },
  },
}
</script>

<style>
</style>
