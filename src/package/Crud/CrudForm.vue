<template>
  <div v-if="value">
    <a-modal :visible="value" @ok="handleSubmit" @cancel="cancel">
      <div slot="title">
        <a-icon :type="icon" /> &nbsp;{{title}}
      </div>
      <a-form :form="formAction" @submit="handleSubmit">
        <!-- {{decRow}} {{columns}} -->
        <a-form-item v-for="(item) in columns" :key="item._uuid" :label="item.title" :labelCol="{ span: labelCol }" :wrapperCol="{ span: wrapperCol }">
          <!-- input -->
          <a-input v-if="item.formOptions.schema.el=='input'" :disabled="item._disabled" v-decorator="[
          item.dataIndex,
          {rules: item.formOptions.rules,initialValue: decRow[item.dataIndex]}
        ]" placeholder="Please select a country" />
          <!-- select -->
          <a-select v-else-if="item.formOptions.schema.el=='select'" :mode="item.formOptions.schema.type?item.formOptions.schema.type:''" v-decorator="[
          item.dataIndex,
          {rules: item.formOptions.rules,initialValue: decRow[item.dataIndex]}
        ]">
            <a-select-option :value="item.value" v-for="(item,eq) in item.formOptions.schema.options" :key="eq">{{item.label}}</a-select-option>
          </a-select>
          <!-- switch -->
          <a-switch v-else-if="item.formOptions.schema.el=='switch'" v-decorator="[item.dataIndex, { valuePropName: 'checked',initialValue: Boolean(decRow[item.dataIndex])}]" />
          <!-- radio -->
          <a-radio-group v-else-if="item.formOptions.schema.el=='radio'" :disabled="item._disabled" v-decorator="[item.dataIndex,{initialValue: decRow[item.dataIndex]}]" :options="item.formOptions.schema.options"></a-radio-group>
          <!-- checkbox -->
          <template v-else-if="item.formOptions.schema.el=='checkbox'">
            <a-checkbox-group v-decorator="[item.dataIndex,{initialValue: decRow[item.dataIndex]}]" :options="item.formOptions.schema.options"></a-checkbox-group>
          </template>
          <!-- datepicker -->
          <a-date-picker style="width:100%" v-else-if="item.formOptions.schema.el=='datepicker'" v-decorator="[item.dataIndex, {initialValue: decRow[item.dataIndex]},{rules: [{ type: 'object', required: true, message: 'Please select time!' }]},]" />
          <!-- range-picker -->
          <a-range-picker style="width:100%" v-else-if="item.formOptions.schema.el=='datepicker' && item.formOptions.schema.type=='range'" v-decorator="[item.dataIndex,{initialValue: decRow[item.dataIndex]}, {rules: [{ type: 'object', required: true, message: 'Please select time!' }]},]" />
          <!-- tree -->

          <template v-else-if="item.formOptions.schema.el=='tree'">
            <v-crud-tree v-decorator="[item.dataIndex]" :field="item.dataIndex" :initialValue="decRow[item.dataIndex]" :treeData="item.formOptions.schema.values" @check-tree="checkTree">
            </v-crud-tree>
          </template>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import VCrudTree from './CrudTree'
// import _ from 'loadsh'
import uuid from 'uuid'
export default {
  name: 'v-crud-form',
  components: {
    VCrudTree,
  },
  props: {
    sourceColumns: Array,
    asyncCols: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 从表格传进来的当前行的数据
    row: Object,
    // 新增和修改时的初始行数据
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
      // formAction: null,
      // columns: [],
      tempCols: this.sourceColumns,
      // 用于改造row数据
      decRow: this.row,
    }
  },
  watch: {
    value: {
      handler(val) {
        // this.filterCols()
      },
    },
    // asyncCols: {
    //   handler(val) {
    //     if (val.length) {
    //       this.tempCols = this.sourceColumns.map(v => {
    //         val.map(s => {
    //           if (v.dataIndex === s.dataIndex) {
    //             console.log('遇到异步数据开始合并')
    //             console.log('源数据', v)
    //             console.log('异步数据', s)
    //             v = { ...v, ...s }
    //             console.log('合并结果', v)
    //           }
    //         })
    //         return v
    //       })
    //     }
    //   },
    //   deep: true,
    // },
    asyncRow: {
      handler(val) {
        this.decRow = { ...this.row, ...val }
        console.log('this.decRow ', this.decRow)
        this.formAction.getFieldsValue()
        console.log(
          'this.formAction.getFieldsValue()',
          this.formAction.getFieldsValue()
        )
        let keys = Object.keys(this.decRow)
        console.log('keys',keys)
        keys.map(v => {
          let obj = {}
          let field = v
          let value = this.decRow[field]
          obj[field] = value
          this.formAction.setFieldsValue(obj)
          console.log('obj',obj)
          console.log('value',value)
        })
        //  console.log(
        //   'this.formAction.getFieldsValue()>>>>>>>>>>>',
        //   this.formAction.getFieldsValue()
        // )

        // this.decRow.map(v=>{
        //   if(v.formOptions.schema.el === 'tree'){
        //     let obj ={}
        //     let field = v.formOptions.schema.dataIndex
        //     let value =
        //     this.formAction.setFieldsValue(obj)
        //   }
        // })
      },
      deep: true,
      immediate: true,
    },
    row: {
      handler(val) {
        this.decRow = { ...this.asyncRow, ...val }
        console.log('this.decRow ', this.decRow)
        // this.$nextTick(()=>{
        //   this.formAction.resetFields()
        // })
      },
      deep: true,
      immediate: true,
    },
    // tempCols:{
    //   handler(val,oval){
    //     // this.formAction.resetFields()
    //     // this.filterCols()
    //     console.log('数据改变了',val,oval)
    //   },
    //   deep:true
    // },
    columns: {
      handler(val, oval) {
        console.log('我检查到改变了', val, oval)
      },
      deep: true,
    },
  },
  computed: {
    columns() {
      if (this.value) {
        let tempCols = this.concatCols()
        if (this.isEdit) {
          // 编辑
          let columns = tempCols.filter(v => {
            if (
              !(
                (v.formOptions.visible &&
                  v.formOptions.visible.edit === false) ||
                v.formOptions.visible === false
              )
            ) {
              if (
                (v.formOptions.disabled && v.formOptions.disabled === true) ||
                (v.formOptions.disabled && v.formOptions.disabled.edit === true)
              ) {
                v._disabled = true
              } else {
                v._disabled = false
              }
              v._uuid = uuid()
              return v
            }
          })
          // this.$set(this.columns,0 ,columns)
          return columns
        } else {
          // 新增
          let columns = tempCols.filter(v => {
            if (
              !(
                (v.formOptions.visible &&
                  v.formOptions.visible.add === false) ||
                v.formOptions.visible === false
              )
            ) {
              if (
                (v.formOptions.disabled && v.formOptions.disabled === true) ||
                (v.formOptions.disabled && v.formOptions.disabled.add === true)
              ) {
                v._disabled = true
              } else {
                v._disabled = false
              }
              v._uuid = uuid()
              return v
            }
          })
          // this.$set(this.columns,0 ,columns)
          return columns
        }
      }
    },
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.formAction.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('handle-submit', values)
          this.formAction.resetFields()
        }
      })
    },
    filterCols() {
      // setTimeout(()=>{this.columns=[]},5000)
      if (this.value) {
        if (this.isEdit) {
          // 编辑
          let columns = this.sourceColumns.filter(v => {
            if (
              !(
                (v.formOptions.visible &&
                  v.formOptions.visible.edit === false) ||
                v.formOptions.visible === false
              )
            ) {
              if (
                (v.formOptions.disabled && v.formOptions.disabled === true) ||
                (v.formOptions.disabled && v.formOptions.disabled.edit === true)
              ) {
                v._disabled = true
              } else {
                v._disabled = false
              }
              v._uuid = uuid()
              return v
            }
          })
          // this.$set(this.columns,0 ,columns)
          this.columns = columns
        } else {
          // 新增
          let columns = this.sourceColumns.filter(v => {
            if (
              !(
                (v.formOptions.visible &&
                  v.formOptions.visible.add === false) ||
                v.formOptions.visible === false
              )
            ) {
              if (
                (v.formOptions.disabled && v.formOptions.disabled === true) ||
                (v.formOptions.disabled && v.formOptions.disabled.add === true)
              ) {
                v._disabled = true
              } else {
                v._disabled = false
              }
              v._uuid = uuid()
              return v
            }
          })
          // this.$set(this.columns,0 ,columns)
          this.columns = columns
        }
      }
    },
    cancel() {
      this.$emit('input', false)
      this.formAction.resetFields()
    },
    concatCols() {
      return this.sourceColumns.map(v => {
        this.asyncCols.map(s => {
          if (v.dataIndex === s.dataIndex) {
            console.log('遇到异步数据开始合并')
            console.log('源数据', v)
            console.log('异步数据', s)
            v = { ...v, ...s }
            console.log('合并结果', v)
          }
        })
        return v
      })
    },
    onSelect() {},
    onExpand() {},
    checkTree(field, checkedKeys) {
      console.log(field, checkedKeys)
      // this.treeArr = checkedKeys
      var obj = {}
      obj[field] = checkedKeys
      console.log('1', this.formAction.getFieldsValue())
      this.formAction.setFieldsValue(obj)
      console.log('2', this.formAction.getFieldsValue())
    },
  },
}
</script>

<style scoped>
</style>