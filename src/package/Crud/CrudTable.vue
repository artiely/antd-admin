<template>
  <div>
    <a-card>
      <div style="padding-bottom:8px" class="clearfix">
        <a-button type="primary" @click="add">新增</a-button>
      </div>
      <a-table :columns="columns" :dataSource="dataSource" :pagination="false" :loading="loading" size="middle" :bordered="false">
        <a slot="action" slot-scope="text, record, index">
          <span @click="edit(text, record, index)">编辑</span>
          <a-divider type="vertical" />
          <a-popconfirm v-if="dataSource.length" title="确定删除？" @confirm="() => del(text, record, index)">
            <span style="color:#f00">删除</span>
          </a-popconfirm>
          <a-divider type="vertical" />
          <span @click="info(text, record, index)">详情</span>
        </a>
      </a-table>
      <div class="clearfix" style="padding-top:8px">
        <a-pagination class="pull-right" v-model="page" showSizeChanger :total="totalCount" :pageSize="pageSize" @showSizeChange="showSizeChange" @change="pageChange" />
      </div>
    </a-card>
    <!-- crud -->
    <v-crud-form @handle-submit="handleSubmit" :asyncCols="asyncCols" v-model="actionVisible" :sourceColumns="sourceColumns" :labelCol="labelCol" :wrapperCol="wrapperCol" :row="row" :asyncRow="asyncRow" :title="title" :icon="icon" :isEdit="isEdit"></v-crud-form>
  </div>
</template>

<script>
import VCrudForm from './CrudForm'
export default {
  name: 'v-crud-table',
  components: {
    VCrudForm,
  },
  props: {
    sourceColumns: Array,
    dataSource: Array,
    loading: Boolean,
    totalCount: Number,
    asyncRow: {
      type: Object,
      default: () => {
        return {}
      },
    },
    asyncCols:Array,
    labelCol: {
      type: [Number, String],
      default: 5,
    },
    wrapperCol: {
      type: [Number, String],
      default: 18,
    },
  },
  data() {
    return {
      actionVisible: false,
      row: {},
      title: '',
      icon: '',
      page: 1,
      pageSize: 10,
      isEdit: false,
      columns: this.sourceColumns
        .filter(v => {
          if (!v.hidden) {
            return v
          }
        })
        .concat([
          {
            title: '操作',
            key: 'operation',
            width: 200,
            scopedSlots: { customRender: 'action' },
          },
        ]),
    }
  },
  methods: {
    handleSubmit(values) {
      this.$emit('handle-submit', values, this.isEdit)
      this.actionVisible = false
      // if (this.isEdit) {
      //   this.$emit('handle-update', values)
      // } else {
      //   this.$emit('handle-create', values)
      // }
    },
    edit(text, record, index) {
      this.$emit('handle-edit', text, record, index)
      this.row = record
      // this.asyncRow = record
      this.title = '编辑'
      this.icon = 'form'
      this.actionVisible = true
      this.isEdit = true
    },
    add() {
      this.$emit('handle-add')
      this.row = {}
      this.title = '新增'
      this.icon = 'plus-square'
      this.actionVisible = true
      this.isEdit = false
    },
    del(text, record, index) {
      this.$emit('handle-delete', record)
    },
    info(text, record, index) {
      this.$emit('handle-info', record)
    },
    pageChange(page, pageSize) {
      this.page = page
      this.pageSize = pageSize
      this.$emit('handle-page', page, pageSize)
    },
    showSizeChange(current, size) {
      this.page = current
      this.pageSize = size
      this.$emit('handle-page', current, size)
    },
  },
}
</script>

<style scoped>
</style>