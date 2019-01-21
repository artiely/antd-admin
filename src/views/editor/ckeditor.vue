<template>
  <a-card >
    <textarea name="editor1" id="editor1" rows="10" cols="80">
      This is my textarea to be replaced with CKEditor.
    </textarea>
  </a-card>
</template>

<script>
// import CKEDITOR from 'ckeditor-full'
/* global CKEDITOR */
export default {
  mounted() {
    this.$nextTick(() => {
      CKEDITOR.replace('editor1')
    })
  },
}
</script>
