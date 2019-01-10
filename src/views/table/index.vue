<template>
  <div>
    <a-card>
      <a-form class="ant-advanced-search-form" @submit="handleSearch" :form="form">
        <a-row :gutter="24">
          <a-col
            v-for="i in 10"
            :xs="24"
            :sm="12"
            :md="12"
            :lg="6"
            :key="i"
            :style="{ display: i < count ? 'block' : 'none' }"
          >
            <a-form-item>
              <a-input
                v-decorator="[
                  `field-${i}`,
                  {
                    rules: [{
                      required: true,
                      message: 'Input something!',
                    }],
                  }
                ]"
                placeholder="placeholder"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'left' }">
            <a-button type="primary" htmlType="submit">搜索</a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">清空</a-button>
            <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">展开更多搜索条件
              <a-icon :type="expand ? 'up' : 'down'"/>
            </a>
            <!-- <a-button shape="circle" icon="setting" @click="showModal" class="pull-right"></a-button>
            <a-button shape="circle" icon="table"  class="pull-right"></a-button>-->
            <a-button-group class="pull-right">
              <a-tooltip title="设置显示列">
                <!-- <template slot="title">
          <span>prompt text</span>
                </template>-->
                <a-button type="primary" icon="setting" @click="showModal"></a-button>
              </a-tooltip>
              <a-tooltip title="显示方式">
                <a-button icon="table"></a-button>
              </a-tooltip>
              <!-- <a-button >导出</a-button> -->
              <a-tooltip title="数据导出">
                <a-button type="dashed" icon="cloud-download"></a-button>
              </a-tooltip>
            </a-button-group>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card style="margin-top:20px">
      <a-button type="primary" @click="add">新增</a-button>
      <!-- table -->
      <a-table v-if="!isMobile" :columns="columns" :dataSource="data">
        <a
          slot="action"
          slot-scope="text, record, index"
          @click="handleAction(text, record, index)"
        >action</a>
      </a-table>

      <a-card v-else hoverable style="width: 300px">
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          slot="cover"
        >
        <template class="ant-card-actions" slot="actions">
          <a-icon type="setting"/>
          <a-icon type="edit"/>
          <a-icon type="ellipsis"/>
        </template>
        <a-card-meta title="Card title" description="This is the description">
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-card-meta>
      </a-card>

      <a-modal title="筛选展示的列" :visible="visible" @ok="handleOk" @cancel="handleCancel">
        <a-alert message="勾选对应的项即可在列表展示" banner closable/>
        <a-checkbox-group :options="options" v-model="value" @change="onChange"/>
      </a-modal>
    </a-card>
    <!-- crud -->
    <v-crud
      @handle-submit="handleSubmit"
      v-model="actionVisible"
      :sourceColumns="sourceColumns"
      :labelCol="5"
      :wrapperCol="18"
      :row="row"
    ></v-crud>
  </div>
</template>
<script>
import moment from 'moment'
// 原始数据
const sourceColumns = [
  {
    title: '输入框',
    dataIndex: 'name',
    key: 'name',
    formOptions: {
      schema: {
        model: 'input',
        type: 'text',
      },
      rules: [{ required: true, message: 'Please input your note!' }],
    },
  },
  {
    title: '单选',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    formOptions: {
      schema: {
        model: 'select',
        options: [{ value: 1, label: '篮球' }, { value: 2, label: '足球' }],
      },
      rules: [{ required: true, message: 'Please input your note!' }],
    },
  },

  {
    title: '多选',
    dataIndex: 'multiple',
    key: '2',
    formOptions: {
      schema: {
        model: 'select',
        type: 'multiple',
        options: [
          { value: 'China', label: '中国' },
          { value: 'USA', label: '美国' },
        ],
      },
    },
  },
  {
    title: '开关',
    dataIndex: 'onoff',
    key: '1',
    formOptions: {
      schema: {
        model: 'switch',
        value: true,
      },
    },
  },
  {
    title: 'radio',
    dataIndex: 'radio',
    key: '3',
    formOptions: {
      schema: {
        model: 'radio',
        options: [{ value: 1, label: '男' }, { value: 2, label: '女' }],
      },
    },
  },
  {
    title: 'checkbox',
    dataIndex: 'checkbox',
    key: '3',
    formOptions: {
      schema: {
        model: 'checkbox',
        options: [{ value: 1, label: '男' }, { value: 2, label: '女' }],
      },
    },
  },
  {
    title: 'datepicker',
    dataIndex: 'datepicker',
    key: '3',
    formOptions: {
      schema: {
        model: 'datepicker',
        value: '',
      },
    },
  },
  {
    title: 'range-picker',
    dataIndex: 'datepicker-range',
    key: '3',
    formOptions: {
      schema: {
        model: 'range-picker',
        value: '',
      },
    },
  },
]
// 更多选项的值
const options = sourceColumns.map(v => {
  return v.title
})
const value = sourceColumns
  .map(v => {
    return v.title
  })
  .slice(0, 5)
// 默认展示的部分值
// const columns = SourceColumns.slice(0,5)
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    onoff: true,
    multiple: ['New York Park', '234'],
    radio: 1,
    checkbox: [1, 2],
    datepicker: moment(),
    'datepicker-range': [moment(), moment()],
  },
  // {
  //   key: '2',
  //   name: 'Jim Green',
  //   age: 40,
  //   onoff: false,
  //   multiple: 'London Park',
  //   radio: 2,
  //   checkbox: 'London Park',
  //   datepicker: new Date(),
  // },
]

export default {
  data() {
    return {
      data,
      options,
      sourceColumns,
      columns: [],
      expand: false,
      form: this.$form.createForm(this),
      visible: false,
      actionVisible: false,
      value,
      values: '',
      row: {},
    }
  },
  watch: {
    value: {
      handler() {
        this.columns = sourceColumns.filter(v => {
          const findeIndex = el => {
            return el === v.title
          }
          let index = this.value.findIndex(findeIndex)
          if (index !== -1) {
            return v
          }
        })
        this.columns.push({
          title: 'Action',
          key: 'operation',
          width: 100,
          scopedSlots: { customRender: 'action' },
        })
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    count() {
      return this.expand ? 11 : 5
    },
    isMobile() {
      return this.$store.state.sys.isMobile
    },
  },
  methods: {
    handleSearch(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
      })
    },
    add() {
      this.row = {}
      this.actionVisible = true
    },
    handleSubmit(e) {
      alert(JSON.stringify(e))
      this.actionVisible = false
    },
    handleAction(text, record, index) {
      this.row = record
      this.actionVisible = true
    },
    handleReset() {
      this.form.resetFields()
    },

    toggle() {
      this.expand = !this.expand
    },
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.visible = false
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    onChange(checkedValues) {
      console.log('checked = ', checkedValues)
      console.log('value = ', this.value)
    },
  },
}
</script>
