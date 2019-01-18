<template>
  <div>
    <v-crud
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
    ></v-crud>
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
            el: 'input',
            visible: false,
          },
        },
        {
          title: 'roleName',
          dataIndex: 'roleName',
          formOptions: {
            el: 'input',
            rules: [{ required: true, message: 'Please input username!' }],
          },
        },
        {
          title: 'remark',
          dataIndex: 'remark',
          hidden: true,
          formOptions: {
            el: 'input',
            disabled: {
              edit: true,
            },
            rules: [{ message: 'Please input username!' }],
          },
        },
        {
          title: 'createTime',
          dataIndex: 'createTime',
          key: 'createTime',
          formOptions: {
            el: 'datepicker',
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
    handleSubmit(values, isEdit) {
      alert(JSON.stringify(values))
      return
      if (isEdit) {
        this.update(values)
      } else {
        this.save(values)
      }
    },
    async handleEdit(text, record, index) {
      let res = await this.$api.ROLE_INFO({ id: record.roleId })
      if (res.code === 0) {
        // 请求当前行的权限数据，然后设置成默认值
        this.row = { ...record, menuIdList: res.role.menuIdList }

        console.log('当前行', this.row)
      }
    },
    async handleAdd() {
      let res = await this.$api.ROLE_INFO({ id: 1 })
      // 新增时设置的默认值(管理员所有)
      if (res.code === 0) {
        this.row = { menuIdList: res.role.menuIdList }
      }
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