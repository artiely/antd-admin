<template>
  <a-card>
    工作台 {{$t('message.hello')}} test auto deploy
    <a-time-picker use12Hours @change="onChange"/>
    测试自动发布
  </a-card>
</template>

<script>
export default {
  methods: {
    onChange(time, timeString) {
      console.log(time, timeString)
    },
  },
}
</script>

<style scoped>
</style>
