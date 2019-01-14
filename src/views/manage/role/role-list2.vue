<template>
  <div>
    sourceColumns也存在异步更新》》》》》》》》》》》》》》》》》
    <v-crud-table
      :sourceColumns="sourceColumns"
      :dataSource="data"
      :totalCount="totalCount"
      :loading="loading"
      @handle-submit="handleSubmit"
      @handle-info="handleRetrieve"
      @handle-delete="handleDelete"
      @handle-edit="handleEdit"
      @handle-add="handleAdd"
      @handle-page="handlePage"
      :asyncRow="row"
    >
      <!-- <a-table :columns="cols" :dataSource="data" slot="table">
        <a slot="action" slot-scope="text, record, index">
          <span @click="edit(text, record, index)">编辑</span>
          <a-divider type="vertical"/>
          <a-popconfirm
            title="确定删除？"
            @confirm="() => del(text, record, index)"
          >
            <span style="color:#f00">删除</span>
          </a-popconfirm>
          <a-divider type="vertical"/>
          <span @click="info(text, record, index)">详情</span>
        </a>
      </a-table> -->
    </v-crud-table>
  </div>
</template>

<script>
import { treeDataTranslate } from '../../../utils/index'
import roleList from './role'
import roleInfo from './role-info'

export default {
  data() {
    return {
      sourceColumns:[
        {
          title: 'roleId',
          dataIndex: 'roleId',
          formOptions: {
            el: 'input',
            visible: false,
          },
        },
        {
          title: '职位',
          dataIndex: 'roleName',
          formOptions: {
            el: 'select',
            rules: [{ required: true, message: '请选择职位!' }],
            placeholder: '请选择职位',
            options: [
              { label: '前端工程师', value: '前端工程师' },
              { label: 'java工程师', value: 'java工程师' },
              { label: '测试工程师', value: '测试工程师' },
            ],
          },
        },
        {
          title: '备注',
          dataIndex: 'remark',
          hidden: true,
          formOptions: {
            el: 'input',
            rules: [{ message: '请备注角色名称含义!' }],
            placeholder: '请备注角色名称含义',
          },
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          formOptions: {
            visible: false,
          },
        },
        {
          title: '入职时间',
          dataIndex: 'addTime',
          formOptions: {
            el: 'datepicker',
            format: 'YYYY-MM-DD',
            rules: [{ required: true, message: '请选择入职时间!' }],
          },
        },
        {
          title: '合同期限',
          dataIndex: 'pactTime',
          formOptions: {
            el: 'datepicker',
            type: 'range',
            format: 'YYYY-MM-DD',
            rules: [{ required: true, message: '请选择合同期限!' }],
          },
        },
        {
          title: '权限',
          dataIndex: 'menuIdList',
          key: 'menuIdList',
          hidden: true,
          formOptions: {
            el: 'tree',
            values: this.$store.state.role.menuList,
            rules: [{ required: true, message: 'Please input username!' }],
          },
        },
      ],
      data: [],
      loading: false,
      query: {
        page: 1,
        limit: 10,
      },
      totalCount: 0,
      menuList: [],
      row: {},
    }
  },
  watch: {
    query: {
      handler() {
        this.getData()
      },
      deep: true,
    },
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      setTimeout(() => {
        let res = roleList
        this.loading = false
        if (res.code === 0) {
          this.data = res.page.list.map(v => {
            v.menuIdList = []
            return v
          })
          this.totalCount = res.page.totalCount
        }
      }, 1000)
    },
    handleSubmit(values, isEdit) {
      let str = JSON.stringify(values)
      if (isEdit) {
        alert('编辑结果>>>>>>>>>>>>>>' + str)
      } else {
        alert('保存结果>>>>>>>>>>>>>>' + str)
      }
    },
    async handleEdit(text, record, index) {
      let res = roleInfo
      setTimeout(() => {
        if (res.code === 0) {
          // 请求当前行的权限数据，然后设置成默认值
          this.row = { menuIdList: res.role.menuIdList }
        }
      }, 1000)
    },
    async handleAdd() {
      let res = roleInfo
      setTimeout(() => {
        if (res.code === 0) {
          // 新增时设置的默认值(管理员所有)
          this.row = { menuIdList: res.role.menuIdList }
        }
      }, 1000)
    },
    handleRetrieve() {
      alert('点击了详情')
    },
    handleDelete() {
      alert('点击了删除')
    },
    handlePage(current, size) {
      this.query.page = current
      this.query.limit = size
    },
  },
}
</script>

<style scoped>
</style>