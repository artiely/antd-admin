<template>
  <svg class="icon" aria-hidden="true" v-if="symbol">
    <use :xlink:href="'#'+name"></use>
  </svg>
  <i v-else class="icon iconfont" :class="name" :style="'font-size:'+size+'px;color:'+color"></i>
</template>
<script>
export default {
  name: 'icon',
  props: {
    name: {
      type: String,
      default: ''
    },
    symbol: {
      type: Boolean,
      default: false
    },
    size: {
      type: [Number, String]
    },
    color: {
      type: String
    }
  }
}
</script>
<style lang="less">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
