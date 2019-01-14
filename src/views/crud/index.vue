<template>
  <div>
    <v-crud-form2 size="small" :sourceColumns="sourceColumns" :row="row"></v-crud-form2>
  </div>
</template>

<script>
let sourceColumns = [
  {
    title: '用户id',
    dataIndex: 'userId',
    formOptions: {
      el: 'input',
      placeholder: '输入姓名',
      rules: [{ required: true }],
    },
  },
]

let row = {
  userId: 'tanjie',
}
export default {
  data() {
    return {
      row,
      sourceColumns,
    }
  },
}
</script>

<style scoped>
</style>