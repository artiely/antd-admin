<template>
  <div>
    <textarea id="mytextarea">Hello, World!</textarea>
  </div>
</template>

<script>
import tinymce from 'tinymce'
export default {
  mounted() {
    this.$nextTick(() => {
      this.render()
    })
  },
  methods: {
    render() {
      tinymce.init({
        selector: '#mytextarea',
      })
    },
  },
}
</script>

<style>
</style>
