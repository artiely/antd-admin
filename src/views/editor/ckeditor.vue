<template>
  <div id="xx">
    <textarea name="editor1" id="editor1" rows="10" cols="80">
      This is my textarea to be replaced with CKEditor.
    </textarea>
  </div>
</template>

<script>
// import CKEDITOR from 'ckeditor-full'
export default {
  mounted() {
    this.$nextTick(() => {
      CKEDITOR.replace('editor1')
    })
  },
}
</script>
