<template>
<a-card>
  <div id="div3"></div>
</a-card>
</template>

<script>
import E from 'wangeditor'
export default {
  mounted() {
    this.$nextTick(() => {
      this.render()
    })
  },
  methods: {
    render() {
      // var E = window.wangEditor
      var editor2 = new E('#div3')
      editor2.create()
    },
  },
}
</script>

<style>
</style>
