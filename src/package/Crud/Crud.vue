<template>
  <div>
    <v-crud-table :sourceColumns="sourceColumns"   :dataSource="dataSource"></v-crud-table>
    <!-- crud -->
    <v-crud-form
      @handle-submit="handleSubmit"
      :asyncCols="asyncCols"
      v-model="actionVisible"
      :sourceColumns="sourceColumns"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :row="row"
      :asyncRow="asyncRow"
      :title="title"
      :icon="icon"
      :isEdit="isEdit"
    ></v-crud-form>
  </div>
</template>

<script>
import VCrudForm from './CrudForm'
import VCrudTable from './CrudTable'
export default {
  name: 'v-crud',
  components: {
    VCrudForm,
    VCrudTable
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
    asyncCols: Array,
    labelCol: {
      type: [Number, String],
      default: 5,
    },
    wrapperCol: {
      type: [Number, String],
      default: 18,
    },
  },
  data(){
    return {
      actionVisible: false,
      row: {},
    }
  },
   methods: {
   
    handleSubmit(values) {
      this.$emit('handle-submit', values, this.isEdit)
      this.actionVisible = false
    },
  },
}
</script>

<style scoped>
</style>