<template>
  <div v-if="value">
    <a-modal :visible="value" @ok="handleSubmit" @cancel="cancel">
      <div slot="title">
        <a-icon :type="icon"/>
        &nbsp;{{title}}
      </div>
      <a-form :form="formAction" @submit="handleSubmit">
        <a-form-item
          v-for="(item,i) in columns"
          :key="i"
          :label="item.title"
          :labelCol="{ span: labelCol }"
          :wrapperCol="{ span: wrapperCol }"
        >
          <!-- input -->
          <a-input
            v-if="item.formOptions.schema.el=='input'"
            :disabled="item._disabled"
            v-decorator="[
          item.dataIndex,
          {rules: item.formOptions.rules,initialValue: row[item.dataIndex]}
        ]"
            placeholder="Please select a country"
          />
          <!-- select -->
          <a-select
            v-else-if="item.formOptions.schema.el=='select'"
            :mode="item.formOptions.schema.type?item.formOptions.schema.type:''"
            v-decorator="[
          item.dataIndex,
          {rules: item.formOptions.rules,initialValue: row[item.dataIndex]}
        ]"
          >
            <a-select-option
              :value="item.value"
              v-for="(item,eq) in item.formOptions.schema.options"
              :key="eq"
            >{{item.label}}</a-select-option>
          </a-select>
          <!-- switch -->
          <a-switch
            v-else-if="item.formOptions.schema.el=='switch'"
            v-decorator="[item.dataIndex, { valuePropName: 'checked',initialValue: Boolean(row[item.dataIndex])}]"
          />
          <!-- radio -->
          <a-radio-group
            v-else-if="item.formOptions.schema.el=='radio'"
            :disabled="item._disabled"
            v-decorator="[item.dataIndex,{initialValue: row[item.dataIndex]}]"
            :options="item.formOptions.schema.options"
          ></a-radio-group>
          <!-- checkbox -->
          <a-checkbox-group
            v-else-if="item.formOptions.schema.el=='checkbox'"
            v-decorator="[item.dataIndex,{initialValue: row[item.dataIndex]}]"
            :options="item.formOptions.schema.options"
          ></a-checkbox-group>
          <!-- datepicker -->
          <a-date-picker
            style="width:100%"
            v-else-if="item.formOptions.schema.el=='datepicker'"
            v-decorator="[item.dataIndex, {initialValue: row[item.dataIndex]},{rules: [{ type: 'object', required: true, message: 'Please select time!' }]},]"
          />
          <!-- range-picker -->
          <a-range-picker
            style="width:100%"
            v-else-if="item.formOptions.schema.el=='datepicker' && item.formOptions.schema.type=='range'"
            v-decorator="[item.dataIndex,{initialValue: row[item.dataIndex]}, {rules: [{ type: 'object', required: true, message: 'Please select time!' }]},]"
          />
          <!-- tree -->
          {{asyncRow[item.dataIndex]}}
          <!-- :checkedKeys="asyncRow[item.dataIndex]" -->
          <a-tree
            checkable
            multiple
            defaultExpandAll
            autoExpandParent
            showLine
            :checkedKeys="asyncRow[item.dataIndex]"
            :treeData="item.formOptions.schema.values"
          ></a-tree>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'v-crud-form',
  props: {
    sourceColumns: Array,
    row: Object,
    asyncRow: {
      type: Object,
      default: () => {
        return {}
      },
    },
    value: Boolean,
    title: String,
    icon: {
      type: String,
      default: 'form',
    },
    isEdit: Boolean,
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
      columns: [],
    }
  },
  watch: {
    isEdit: {
      handler(val) {
        if (val) {
          // 编辑
          this.columns = this.sourceColumns.filter(v => {
            if (
              !(v.formOptions.visible && v.formOptions.visible.edit === false)
            ) {
              if (
                (v.formOptions.disabled && v.formOptions.disabled === true) ||
                (v.formOptions.disabled && v.formOptions.disabled.edit === true)
              ) {
                v._disabled = true
              } else {
                v._disabled = false
              }
              return v
            }
          })
        } else {
          // 新增
          this.columns = this.sourceColumns.filter(v => {
            if (
              !(v.formOptions.visible && v.formOptions.visible.add === false)
            ) {
              if (
                (v.formOptions.disabled && v.formOptions.disabled === true) ||
                (v.formOptions.disabled && v.formOptions.disabled.add === true)
              ) {
                v._disabled = true
              } else {
                v._disabled = false
              }
              return v
            }
          })
        }
      },
    },
    asyncRow: {
      handler(val) {
        this.$emit('update:row', { ...this.row, ...val })
      },
      deep: true,
    },
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
    onSelect() {},
    onExpand() {},
  },
}
</script>

<style scoped>
</style>