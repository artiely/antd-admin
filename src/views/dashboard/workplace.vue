<template>
  <a-card>
    工作台 {{$t('message.hello')}} test auto deploy
    <a-time-picker use12Hours @change="onChange"/>
    测试自动发布 123123 tanjie Artiely 888888888888  123 2019年1月4日14:20:43
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
