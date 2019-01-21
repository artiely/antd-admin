<template>
  <div>
    <a-card>
      <mavon-editor v-model="content" style="z-index:2"/>
    </a-card>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      content: '',
    }
  },
  methods: {},
}
</script>
<style>
.v-note-wrapper .v-note-op.shadow {
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.157), 0 0px 1px rgba(0, 0, 0, 0.227) !important;
}
.v-note-wrapper .v-note-panel.shadow {
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.157), 0 0px 1px rgba(0, 0, 0, 0.227) !important;
}
</style>
