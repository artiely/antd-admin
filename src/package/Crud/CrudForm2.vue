<template>
  <div>
    <a-form :form="form">
      <a-form-item
        v-for="(item) in sourceColumns"
        :key="item._uuid"
        :label="item.title"
        :labelCol="{ span: labelCol }"
        :wrapperCol="{ span: wrapperCol }"
        :size="size"
      >
        <template v-if="item.formOptions.el=='input'">
          {{item}} {{row[item.dataIndex]}}
          <v-crud-input :size="size" :item="item" :initialValue="row[item.dataIndex]"></v-crud-input>
        </template>
        <!-- <a-input
            v-decorator="[
          'xx',
          {rules: [{required:true}],initialValue: '123'}
        ]"
            placeholder="Please select a country"
          /> -->
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import VCrudInput from './CrudInput.vue'

export default {
  props: {
    labelCol: {
      type: [String, Number],
      default: 5,
    },
    wrapperCol: {
      type: [String, Number],
      default: 18,
    },
    size: {
      type: String,
      default: 'default',
    },
    sourceColumns: {
      type: Array,
      default: () => {
        return []
      },
    },
    row: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  components: {
    VCrudInput,
  },
  data() {
    return {
      form: this.$form.createForm(this),
    }
  },
}
</script>

<style scoped>
</style>