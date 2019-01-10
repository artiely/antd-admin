<template>
  <div>
    <v-crud-table
      :sourceColumns="sourceColumns"
      :dataSource="data"
      :totalCount="totalCount"
      :loading="loading"
      :initRow="{status:1}"
      @handle-submit="handleSubmit"
      @handle-update="handleUpdate"
      @handle-create="handleCreate"
      @handle-retrieve="handleRetrieve"
      @handle-page="handlePage"
    ></v-crud-table>
  </div>
</template>

<script>
const sourceColumns = [
  {
    title: '用户id',
    dataIndex: 'userId',
    key: 'userId',
    formOptions: {
      schema: {
        el: 'input',
      },
      disabled: true,
      visible: {
        add: false,
      },
    },
  },
  {
    title: '账号',
    dataIndex: 'username',
    key: 'username',
    formOptions: {
      schema: {
        el: 'input',
      },
      disabled: {
        edit: true,
      },
      rules: [{ required: true, message: 'Please input username!' }],
    },
  },
  {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
    hidden: true,
    formOptions: {
      visible: {
        edit: false,
      },
      schema: {
        el: 'input',
      },
      rules: [{ required: true, message: 'Please input username!' }],
    },
  },
  {
    title: '中文名',
    dataIndex: 'chineseName',
    key: 'chineseName',
    formOptions: {
      schema: {
        el: 'input',
      },
      rules: [{ required: true, message: 'Please input username!' }],
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    formOptions: {
      schema: {
        el: 'input',
      },
      rules: [{ required: true, message: 'Please input username!' }],
    },
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
    formOptions: {
      schema: {
        el: 'input',
      },
      rules: [
        {
          required: true,
          type: 'string',
          message: 'Please input mobile!',
          len: 11,
          pattern: /^[0-9]*$/,
        },
      ],
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    formOptions: {
      schema: {
        el: 'radio',
        options: [{ label: '开', value: 1 }, { label: '关', value: 0 }],
      },
      disabled: {
        edit: true,
      },
    },
  },
]
export default {
  data() {
    return {
      sourceColumns,
      data: [],
      loading: false,
      query: {
        page: 1,
        limit: 10,
      },
      totalCount: 0,
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
      let res = await this.$api.USER_LIST(this.query)
      this.loading = false
      if (res.code === 0) {
        this.data = res.page.list
        this.totalCount = res.page.totalCount
      }
    },
    async save(data) {
      let res = await this.$api.USER_SAVE(data)
      if (res.code === 0) {
        alert('成功')
        this.getData()
      }
    },
    async update(data) {
      let res = await this.$api.USER_UPDATE(data)
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
    handleRetrieve() {},
    handlePage(current, size) {
      this.query.page = current
      this.query.limit = size
    },
  },
}
</script>

<style scoped>
</style>