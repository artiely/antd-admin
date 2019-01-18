<template>
  <div>123
    
        <v-crud :sourceColumns="columns" :dataSource="data"></v-crud>
        <!-- 自定义 -->
        自定义表格
        <v-crud :sourceColumns="columns" :dataSource="data" >
          <template slot-scope="xx">
            <a-table :columns="xx.columns" :dataSource="xx.dataSource">
              <a slot="action" slot-scope="text, record, index">
                <span @click="handleEdit(text, record, index)">编辑</span>
                <a-divider type="vertical"/>
                <a-popconfirm
                  title="确定删除？"
                  @confirm="() => handleDel(text, record, index)"
                >
                  <span style="color:#f00">删除</span>
                </a-popconfirm>
                <a-divider type="vertical"/>
                <span @click="handleInfo(text, record, index)">详情</span>
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
  methods:{
    handleEdit(){
      alert(2)
    },
  }
}
</script>

<style scoped>
</style>