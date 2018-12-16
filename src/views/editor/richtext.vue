<template>
  <div>
    <editor v-model="content"></editor>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
// import 'tinymce/themes/modern/theme';
import 'tinymce/skins/lightgray/skin.min.css'
// import 'tinymce/plugins/wordcount';
// import 'tinymce/plugins/code';
// import 'tinymce/plugins/preview';
export default {
  data() {
    return {
      content: 'hello ',
    }
  },
  components: {
    editor: Editor, // <- Important part
  },
}
</script>

<style scoped>
</style>
