<template>
  <div>
    <editor v-model="content"></editor>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
  export default {
    data() {
      return {
        content: 'hello '
      }
    },
    components: {
    'editor': Editor // <- Important part
  },
  }
</script>

<style scoped>

</style>