<template>
  <a-locale-provider :locale="language">
    <div id="app" :style="fixedMenuStyle">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
export default {
  name: 'App',
  computed: {
    fixedMenu() {
      return this.$store.state.sys.menuFixed
    },
    language() {
      return this.$store.state.sys.language.value
    },
    fixedMenuStyle() {
      if (this.$store.state.sys.menuFixed) {
        return {
          height: '100%'
        }
      } else {
        return {
          height: 'auto'
        }
      }
    }
  }
}
</script>
