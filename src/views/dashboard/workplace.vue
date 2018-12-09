<template>
  <div>
    工作台 {{$t('message.hello')}}
    <a-time-picker use12Hours @change="onChange" />
  </div>
</template>

<script>
export default {
  methods: {
    onChange(time, timeString) {
      console.log(time, timeString)
    }
  }
}
</script>

<style scoped>
</style>
