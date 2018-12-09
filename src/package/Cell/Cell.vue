<template>
  <div class="v-cell" :class="{'v-cell--disable':disabled}">
    <div class="v-cell--icon" v-if="leftIcon||leftIconSymbol">
      <v-icon :name="leftIcon?leftIcon:leftIconSymbol" :symbol="leftIconSymbol?true:false" style="font-size:18px;margin-right:4px;"></v-icon>
    </div>
    <div class="v-cell--title">

      <a-tooltip placement="left" v-if="disabled&&disabledTip">
        <template slot="title">
          <span>{{disabledTip}}</span>
        </template>
        <span>{{title}}</span>
      </a-tooltip>
      <a-tooltip placement="left" v-else-if="tip">
        <template slot="title">
          <span>{{tip}}</span>
        </template>
        <span>{{title}}</span>
      </a-tooltip>
      <span v-else>{{title}}</span>
    </div>
    <div class="v-cell--value">
      <a-switch size="small" :defaultChecked="value" @change="handleSwitch" v-if="mode=='switch'" :disabled="disabled" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    leftIcon: String,
    leftIconSymbol: String,
    mode: {
      type: String,
      default: 'value'
    },
    disabledTip: String,
    tip: String,
    disabled: {
      type: Boolean,
      default: false
    },
    value: [String, Number, Boolean, Object]
  },
  methods: {
    handleSwitch(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang="less">
.v-cell {
  height: 40px;
  line-height: 40px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  &.v-cell--disable {
    .v-cell--title {
      color: #c7c7c7;
    }
  }
  &--title {
    flex: 1;
    font-size: 14px;
    color: #333;
  }
  &--value {
    text-align: right;
  }
}
</style>
