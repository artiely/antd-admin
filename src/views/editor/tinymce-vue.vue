<template>
  <tinymce id="d1" v-model="data"></tinymce>
</template>

<script>
import tinymce from 'vue-tinymce-editor'
export default {
  components: {
    tinymce,
  },
  data() {
    return {
      data: '',
    }
  },
}
</script>

<style>
</style>
