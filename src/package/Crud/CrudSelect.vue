<template>
  <a-select
    v-if="item.formOptions.el=='select'"
    :type="item.formOptions.type"
    :disabled="item._disabled"
    :size="size"
    v-decorator="[
          item.dataIndex,
          {rules: item.formOptions.rules,initialValue: initialValue}
        ]"
    :placeholder="item.formOptions.placeholder"
    :prefix="item.formOptions.prefix"
    :suffix="item.formOptions.suffix"
  />
</template>

<script>
export default {
  name: 'v-crud-select',
  props: {
    // formOptions
    item: {
      type: Object,
      default: () => {
        return {
          el: 'select',
          _disabled: false,
          placeholder: '请选择',
          allowClear: false, // 支持清除
          suffix: '', // 后缀图标
          dropdownRender: () => {}, // 自定义下拉框内容
          maxTagCount: '', // 最多显示多少个 tag
          maxTagPlaceholder: '',
          type: 'default', // 'default' | 'multiple' | 'tags' | 'combobox'
          notFoundContent: '无数据',
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