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
    ></v-crud-table>
  </div>
</template>

<script>
const sourceColumns = [
  {
    title: 'menuId',
    dataIndex: 'menuId',
    formOptions: {
      schema: {
        model: 'input',
        disabled: true,
      },
    },
  },
  {
    title: 'parentName',
    dataIndex: 'parentName',
    formOptions: {
      schema: {
        model: 'input',
      },
      rules: [{ required: true, message: 'Please input username!' }],
    },
  },
  {
    title: 'name',
    dataIndex: 'name',
    hidden: true,
    formOptions: {
      visible: {
        edit: false,
      },
      schema: {
        model: 'input',
      },
      rules: [{ required: true, message: 'Please input username!' }],
    },
  },
  {
    title: 'url',
    dataIndex: 'url',
    formOptions: {
      schema: {
        model: 'datepicker',
      },
      visible: {
        add: false,
        edit: false,
      },
      rules: [{ required: true, message: 'Please input username!' }],
    },
  },
  {
    title: 'perms',
    dataIndex: 'perms',
    formOptions: {
      schema: {
        model: 'input',
      },
      rules: [{ required: true, message: 'Please input username!' }],
    },
  },
  {
    title: 'type',
    dataIndex: 'type',
    formOptions: {
      schema: {
        model: 'input',
      },
      rules: [{ required: true, message: 'Please input username!' }],
    },
  },
  {
    title: 'icon',
    dataIndex: 'icon',
    formOptions: {
      schema: {
        model: 'input',
      },
      rules: [{ required: true, message: 'Please input username!' }],
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
      let res = await this.$api.MENU_LIST(this.query)
      this.loading = false
      if (res) {
        this.data = res
        this.query.limit = res.length
        this.totalCount = res.length
      }
    },
    async save(data) {
      let res = await this.$api.MENU_SAVE(data)
      if (res.code === 0) {
        alert('成功')
        this.getData()
      }
    },
    async update(data) {
      let res = await this.$api.MENU_UPDATE(data)
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
  },
}
</script>

<style scoped>
</style>