<template>
  <div>
    <a-alert
      message="默认 table + form-generator"
      description="CRUD表格及表单 默认 可以减去 70% 的重复繁杂工作。"
      type="info"
      showIcon
    />
        <v-crud :sourceColumns="columns" :dataSource="data"></v-crud>
        <!-- 自定义 -->
        <a-alert
          message="自定义表格内容"
          description="只需给操作指定data-type与data-index即可其他和原ant-design-vue的table一样"
          type="info"
          showIcon
        />
        <v-crud :sourceColumns="columns" :dataSource="data" >
          <template slot-scope="xx">
            <a-button data-type="add">添加</a-button>
            <a-table :columns="xx.columns" :dataSource="xx.dataSource">
              <a slot="action" slot-scope="text, record, index">
                <!-- 自定义必须传入data-index data-type -->
                <span  :data-index="index" data-type="edit">编辑</span>
                <a-divider type="vertical"/>
                <!-- popconfirm -->
                  <span style="color:#f00" :data-index="index" data-type="delete">删除</span>
                <a-divider type="vertical"/>
                <span >详情</span>
              </a>
            </a-table>
          </template>
        </v-crud>
      </div>
    </crud>
  </div>
</template>

<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    formOptions: {
      el: 'input',
    },
  },
  {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money',
    formOptions: {
      el: 'input',
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    formOptions: {
      el: 'input',
    },
  },
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
]
import crud from './template/crud'
export default {
  components: {
    crud,
  },
  data() {
    return {
      columns,
      data,
    }
  },
  methods: {
    handleEdit() {
      alert(2)
    },
  },
}
</script>

<style scoped>
</style>
