<template>
  <div>
    <v-crud-table
      :sourceColumns="sourceColumns"
      :dataSource="data"
      :totalCount="totalCount"
      :loading="loading"
      :query.sync="query"
      :initRow="{status:1}"
      @handle-submit="handleSubmit"
      @handle-update="handleUpdate"
      @handle-create="handleCreate"
      @handle-retrieve="handleRetrieve"
      @handle-edit="handleEdit"
      :asyncRow="row"
    ></v-crud-table>
  </div>
</template>

<script>
import { treeDataTranslate } from '../../../utils/index'
export default {
  data() {
    return {
      sourceColumns: [
        {
          title: 'roleId',
          dataIndex: 'roleId',
          formOptions: {
            schema: {
              el: 'input',
            },
            visible:false
          },
        },
        {
          title: 'roleName',
          dataIndex: 'roleName',
          formOptions: {
            schema: {
              el: 'input',
            },
            rules: [{ required: true, message: 'Please input username!' }],
          },
        },
        {
          title: 'remark',
          dataIndex: 'remark',
          hidden: true,
          formOptions: {
            disabled: {
              edit: true,
            },
            schema: {
              el: 'input',
            },
            rules: [{ required: true, message: 'Please input username!' }],
          },
        },
        {
          title: 'createTime',
          dataIndex: 'createTime',
          key: 'createTime',
          formOptions: {
            schema: {
              el: 'datepicker',
            },
            visible: {
              add: false,
              edit: false,
            },
            rules: [{ required: true, message: 'Please input username!' }],
          },
        },
        {
          title: 'menuIdList',
          dataIndex: 'menuIdList',
          key: 'menuIdList',
          formOptions: {
            schema: {
              el: 'tree',
              values: this.$store.state.role.menuList,
            },
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
      row:{}
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
    console.log('444', this.$store.state.role.menuList)
  },
  methods: {
    async getData() {
      this.loading = true
      let res = await this.$api.ROLE_LIST(this.query)
      this.loading = false
      if (res.code === 0) {
        this.data = res.page.list.map(v => {
          v.menuIdList = []
          return v
        })
        this.totalCount = res.page.totalCount
      }
    },
    
    async save(data) {
      let res = await this.$api.ROLE_SAVE(data)
      if (res.code === 0) {
        alert('成功')
        this.getData()
      }
    },
    async update(data) {
      let res = await this.$api.ROLE_UPDATE(data)
      if (res.code === 0) {
        alert('更新成功')
        this.getData()
      }
    },
    handleSubmit(values) {
      alert(JSON.stringify(values))
    },
    handleCreate(values) {
      this.save(values)
    },
    handleUpdate(values) {
      this.update(values)
    },
    async handleEdit(text, record, index) {
      let res = await this.$api.ROLE_INFO({id: record.roleId})
      if (res.code === 0) {
        // this.data[index].menuIdList = res.role.menuIdList
        // this.$set(this.data[index], menuIdList, res.role.menuIdList)
        this.row = {...record,menuIdList:res.role.menuIdList}
      }
    },
    handleRetrieve() {},
  },
}
</script>

<style scoped>
</style>