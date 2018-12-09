<template>
  <div>
    <a-row :gutter="24">
      <a-col :xs="24" :sm="12" :md="12" :lg="6" v-for="i in 9" :key="i">
        <a-card :bordered="false" style="margin-bottom:24px;">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </a-card>
      </a-col>
    </a-row>
    <a-row style="background:#fff">
      <a-col>
        <a-tabs defaultActiveKey="1" size="large">
          <a-tab-pane tab="销售额" key="1">
            <a-row>
              <a-col :xs="24" :sm="24" :md="16" :lg="16">
                <bar id="mountNode" />
              </a-col>
              <a-col :xs="24" :sm="24" :md="8" :lg="8">
                123
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="访问量" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
          <div slot="tabBarExtraContent" style="padding-right:24px;padding-top:7px" class="hidden-xs-only">
            <span class="current-data">
              <a class="active">今日 </a>
              <a>本周 </a>
              <a>本月 </a>
              <a>本年 </a>
            </span>
            <a-range-picker class="hidden-sm-and-down" />
          </div>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import bar from './chart/bar'
export default {
  components: {
    bar
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {
    console.log('刷新了')
  }
}
</script>

<style lang="less">
.current-data {
  padding-right: 10px;
  > a {
    color: #777;
    padding: 0 10px;
    &.active {
      color: #1690ff;
    }
  }
}
</style>
