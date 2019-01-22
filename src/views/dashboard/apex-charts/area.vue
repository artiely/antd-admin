<template>
  <div>
    <div id="chart-area"></div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
export default {
  mounted() {
    this.$nextTick(() => {
      this.render()
    })
  },
  methods: {
    render() {
      var options = {
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            },
          },
        },
        series: [70],
        labels: ['Cricket'],
      }

      var chart = new ApexCharts(document.querySelector('#chart-area'), options)

      chart.render()
    },
  },
}
</script>

<style scoped>
</style>