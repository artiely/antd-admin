<template>
  <div>
    <a-button type="primary" v-isAuth="'sys:menu:save'">有保存权限才看得见我</a-button>
    <v-crud
      :sourceColumns="sourceColumns"
      :dataSource="data"
      :asyncCols="asyncCols"
      :asyncRow="asyncRow"
      :totalCount="totalCount"
      :loading="loading"
      @handle-edit="edit"
      @handle-add="add"
      @handle-page="handlePage"
    ></v-crud>
  </div>
</template>

<script>
const sourceColumns = [
  {
    title: '用户id',
    dataIndex: 'userId',
    key: 'userId',
    formOptions: {
      el: 'input',
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
      el: 'input',
      disabled: {
        edit: true,
      },
      rules: [{ required: true, message: 'Please input username!' }],
      placeholder: '请输入',
    },
  },
  {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
    hidden: true,
    formOptions: {
      el: 'input',
      visible: {
        edit: false,
      },
      rules: [{ required: true, message: 'Please input username!' }],
    },
  },
  {
    title: '中文名',
    dataIndex: 'chineseName',
    key: 'chineseName',
    formOptions: {
      el: 'input',
      rules: [{ required: true, message: 'Please input username!' }],
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    formOptions: {
      el: 'input',
      rules: [{ required: true, message: 'Please input username!' }],
    },
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
    formOptions: {
      el: 'input',
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
    title: '角色',
    dataIndex: 'roleIdList',
    key: 'roleIdList',
    formOptions: {
      el: 'checkbox',
      options: [],
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    formOptions: {
      el: 'radio',
      options: [{ label: '开', value: 1 }, { label: '关', value: 0 }],
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
      formVisible: false,
      totalCount: 0,
      asyncRow: {},
      asyncCols: [],
      roleSelect: [],
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
    handleSubmit(values, isEdit) {
      alert(JSON.stringify(values))
      return
      if (isEdit) {
        this.update(values)
      } else {
        this.save(values)
      }
    },
    edit(text, record, index) {
      this.$store.dispatch('role/getRoleSelect').then(() => {
        // 异步的模型数据
        this.asyncCols = [
          {
            dataIndex: 'roleIdList',
            formOptions: {
              options: this.$store.state.role.roleSelect,
            },
          },
        ]
        this.$api.USER_INFO({ userId: record.userId }).then(res => {
          this.asyncRow = {
            roleIdList: res.user.roleIdList,
          }
        })
      })
    },
    add() {
      this.$store.dispatch('role/getRoleSelect').then(() => {
        this.asyncCols = [
          {
            dataIndex: 'roleIdList',
            formOptions: {
              options: this.$store.state.role.roleSelect,
            },
          },
        ]
        this.asyncRow = { status: 1, roleIdList: [] }
      })
    },
    del(text, record, index) {},
    info(text, record, index) {},
    handlePage(page, limit) {
      this.query.page = page
      this.query.limit = limit
    },
  },
}
</script>

<style scoped>
</style>
