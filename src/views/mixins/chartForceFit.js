export default {
  computed: {
    isCollapse() {
      return this.$store.state.sys.isCollapse
    }
  },
  watch: {
    isCollapse: {
      handler() {
        console.log('trigger')
        this.chartList[0].forceFit()
      }
    }
  },
  mounted() {
  }
}
