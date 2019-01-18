<template>
  <div>
    <a-card>
      <slot :columns="columns">
        <div style="padding-bottom:8px" class="clearfix">
          <a-button type="primary" @click="add">新增</a-button>
        </div>
        <a-table
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          :loading="loading"
          size="middle"
          :bordered="false"
        >
          <a slot="action" slot-scope="text, record, index">
            <span @click="edit(text, record, index)">编辑</span>
            <a-divider type="vertical"/>
            <a-popconfirm
              v-if="dataSource.length"
              title="确定删除？"
              @confirm="() => del(text, record, index)"
            >
              <span style="color:#f00">删除</span>
            </a-popconfirm>
            <a-divider type="vertical"/>
            <span @click="info(text, record, index)">详情</span>
          </a>
        </a-table>
        <div class="clearfix" style="padding-top:8px">
          <a-pagination
            class="pull-right"
            v-model="page"
            showSizeChanger
            :total="totalCount"
            :pageSize="pageSize"
            @showSizeChange="showSizeChange"
            @change="pageChange"
          />
        </div>
      </slot>
    </a-card>
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
    totalCount:[Number,String]
  },
  data() {
    return {
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
    edit(text, record, index) {
      this.$emit('handle-edit', text, record, index)
      
    },
    add() {
      this.$emit('handle-add')
     
    },
    del(text, record, index) {
      this.$emit('handle-delete', text, record, index)
    },
    info(text, record, index) {
      this.$emit('handle-info', text, record, index)
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