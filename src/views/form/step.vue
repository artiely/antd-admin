<template>
  <div>
    <a-card title="更新日志">
      <a-steps direction="vertical" size="small" :current="1">
        <a-step :title="item.commit.committer.date" :description="item.commit.message" v-for="(item,index) in list" :key="index"/>
      </a-steps>
    </a-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      axios
        .get('https://api.github.com/repos/artiely/cb-app-cli3/commits')
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.list = res.data
          }
        })
    },
  },
}
</script>

<style scoped>
</style>
