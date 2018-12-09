<template>
<div>
  <a-card>
     <a-form class='ant-advanced-search-form' @submit="handleSearch" :form="form">
      <a-row :gutter="24">
        <a-col v-for="i in 10" :xs="24" :sm="12" :md="12" :lg="6" :key="i" :style="{ display: i < count ? 'block' : 'none' }">
          <a-form-item>
            <a-input v-decorator="[
                  `field-${i}`,
                  {
                    rules: [{
                      required: true,
                      message: 'Input something!',
                    }],
                  }
                ]" placeholder='placeholder' />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'left' }">
          <a-button type='primary' htmlType='submit'>搜索</a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            清空
          </a-button>
          <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
            展开更多搜索条件
            <a-icon :type="expand ? 'up' : 'down'" />
          </a>
          <a-button shape="circle" icon="setting" @click="showModal" class="pull-right"></a-button>
          <a-button shape="circle" icon="table"  class="pull-right"></a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
  <a-card>

   
    <a-table :columns="columns" :dataSource="data">
      <a slot="action" slot-scope="text" href="javascript:;">action</a>
    </a-table>

    <a-modal title="筛选展示的列" :visible="visible" @ok="handleOk" @cancel="handleCancel">
      <a-alert message="勾选对应的项即可在列表展示" banner closable />
      <a-checkbox-group :options="options" v-model="value" @change="onChange" />
    </a-modal>
  </a-card>
</div>
  
</template>
<script>
// 原始数据
const SourceColumns = [
  { title: 'Full Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age' },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  
]
// 更多选项的值
const options = SourceColumns.map(v => {
  return v.title
})
const value = SourceColumns.map(v => {
  return v.title
}).slice(0, 5)
// 默认展示的部分值
// const columns = SourceColumns.slice(0,5)
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park'
  }
]

export default {
  data() {
    return {
      data,
      options,
      columns: [],
      expand: false,
      form: this.$form.createForm(this),
      visible: false,
      value
    }
  },
  watch: {
    value: {
      handler() {
        this.columns = SourceColumns.filter(v => {
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
    scopedSlots: { customRender: 'action' }
  })
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    count() {
      return this.expand ? 11 : 5
    }
    // columns() {
    //   SourceColumns.filter(v=>{
    //     const findeIndex = (el)=>{
    //       return el===v.title
    //     }
    //     let index = this.value.findIndex(findeIndex)
    //     if(index!==-1){
    //       return v
    //     }
    //   })
    // }
  },
  methods: {
    handleSearch(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
      })
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
    }
  }
}
</script>
