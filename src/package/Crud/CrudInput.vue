<template>
  <a-input
     v-decorator="[
          item.dataIndex,
          {rules: [{required: true}],initialValue: 'decRow[item.dataIndex]'}
        ]"
  />
  <!-- 
    :type="item.formOptions.type"
    :disabled="item._disabled"
    :placeholder="item.formOptions.placeholder"
    :prefix="item.formOptions.prefix"
    :suffix="item.formOptions.suffix"
    :size="size" -->
</template>

<script>
export default {
  name: 'v-crud-input',
  props: {
    // formOptions
    item: {
      type: Object,
      default: () => {
        return {
          el: 'input',
          type: 'text',
          _disabled: false,
          placeholder: '请输入',
          rules: [],
          prefix: '', // 前缀图标
          suffix: '', // 后缀图标
        }
      },
    },
    // 表单的尺寸
    size: {
      type: String,
      default: 'default',
    },
    // 表单默认值
    initialValue: [String, Number],
  },
}
</script>

<style scoped>
</style>