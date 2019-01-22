import Vue from 'vue'
import Skeleton from './package/skeleton/Skeleton2'

export default new Vue({
  components: {
    Skeleton,
  },
  render: h => h(Skeleton),
})
