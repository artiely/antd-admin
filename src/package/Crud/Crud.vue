<template>
  <div v-if="value">
    <a-modal :visible="value" @ok="handleSubmit" @cancel="cancel">
      <div slot="title">
        <a-icon type="form"/>&nbsp;编辑
      </div>
      <a-form :form="formAction" @submit="handleSubmit">
        <a-form-item
          v-for="(item,i) in sourceColumns"
          :key="i"
          :label="item.title"
          :labelCol="{ span: labelCol }"
          :wrapperCol="{ span: wrapperCol }"
        >
          <!-- input -->
          <a-input
            v-if="item.formOptions.schema.model=='input'"
            v-decorator="[
          item.dataIndex,
          {rules: item.formOptions.rules,initialValue: row[item.dataIndex]}
        ]"
            placeholder="Please select a country"
          />
          <!-- select -->
          <a-select
            v-else-if="item.formOptions.schema.model=='select'"
            :mode="item.formOptions.schema.type?item.formOptions.schema.type:''"
            v-decorator="[
          item.dataIndex,
          {rules: item.formOptions.rules,initialValue: row[item.dataIndex]}
        ]"
          >
            <a-select-option
              :value="item.value"
              v-for="item in item.formOptions.schema.options"
            >{{item.label}}</a-select-option>
          </a-select>
          <!-- switch -->
          <a-switch
            v-else-if="item.formOptions.schema.model=='switch'"
            v-decorator="[item.dataIndex, { valuePropName: 'checked',initialValue: row[item.dataIndex]}]"
          />
          <!-- radio -->
          <a-radio-group
            v-else-if="item.formOptions.schema.model=='radio'"
            v-decorator="[item.dataIndex,{initialValue: row[item.dataIndex]}]"
            :options="item.formOptions.schema.options"
          ></a-radio-group>
          <!-- checkbox -->
          <a-checkbox-group
            v-else-if="item.formOptions.schema.model=='checkbox'"
            v-decorator="[item.dataIndex,{initialValue: row[item.dataIndex]}]"
            :options="item.formOptions.schema.options"
          ></a-checkbox-group>
          <!-- datepicker -->
          <a-date-picker
            style="width:100%"
            v-else-if="item.formOptions.schema.model=='datepicker'"
            v-decorator="[item.dataIndex, {initialValue: row[item.dataIndex]},{rules: [{ type: 'object', required: true, message: 'Please select time!' }]},]"
          />
          <!-- range-picker -->
          <a-range-picker
            style="width:100%"
            v-else-if="item.formOptions.schema.model=='range-picker'"
            v-decorator="[item.dataIndex,{initialValue: row[item.dataIndex]}, {rules: [{ type: 'object', required: true, message: 'Please select time!' }]},]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'v-crud',
  props: {
    sourceColumns: Array,
    row: Object,
    value: false,
    labelCol: {
      type: [Number, String],
      default: 5,
    },
    wrapperCol: {
      type: [Number, String],
      default: 18,
    },
  },
  data() {
    return {
      formAction: this.$form.createForm(this),
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.formAction.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('handle-submit', values)
        }
      })
    },
    cancel() {
      this.$emit('input', false)
    },
  },
}
</script>

<style scoped>
</style>