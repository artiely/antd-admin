<template>
  <div>
    <div id="chart-line2"></div>
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
      var lastDate = 0
      var data = []
      function getDayWiseTimeSeries(baseval, count, yrange) {
        var i = 0
        while (i < count) {
          var x = baseval
          var y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
            yrange.min

          data.push({
            x,
            y,
          })
          lastDate = baseval
          baseval += 86400000
          i++
        }
      }

      getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
        min: 10,
        max: 90,
      })

      function getNewSeries(baseval, yrange) {
        var newDate = baseval + 86400000
        lastDate = newDate
        data.push({
          x: newDate,
          y:
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
            yrange.min,
        })
      }

      function resetData() {
        data = data.slice(data.length - 10, data.length)
      }

      var options = {
        chart: {
          height: 350,
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 2000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        series: [
          {
            data: data,
          },
        ],
        title: {
          text: 'Dynamic Updating Chart',
          align: 'left',
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: 'datetime',
          range: 777600000,
        },
        yaxis: {
          max: 100,
        },
        legend: {
          show: false,
        },
      }

      var chart = new ApexCharts(
        document.querySelector('#chart-line2'),
        options
      )

      chart.render()

      window.setInterval(function() {
        getNewSeries(lastDate, {
          min: 10,
          max: 90,
        })

        chart.updateSeries([
          {
            data: data,
          },
        ])
      }, 2000)

      // every 60 seconds, we reset the data
      window.setInterval(function() {
        resetData()
        chart.updateSeries(
          [
            {
              data,
            },
          ],
          false,
          true
        )
      }, 60000)
    },
  },
}
</script>

<style scoped>
</style>