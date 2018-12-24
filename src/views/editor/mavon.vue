<template>
  <div>
    <mavon-editor v-model="value" style="z-index:2"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    }
  },
}
</script>
