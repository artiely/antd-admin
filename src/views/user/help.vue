<template>
  <a-card>
    <vue-markdown>{{msg}}</vue-markdown>
  </a-card>
</template>

<script>
import README from '../../../README.md'
import VueMarkdown from 'vue-markdown'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import $ from 'jquery'
export default {
  components: {
    VueMarkdown,
  },
  data() {
    return {
      msg: README,
    }
  },
  mounted() {
    this.$nextTick(() => {
      hljs.configure({ useBR: true })
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block)
      })
    })
  },
}
</script>

<style scoped>
</style>
