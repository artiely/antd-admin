<template>
  <div>
    <slot  :columns="columns" :dataSource="dataSource" >
      <a-table :columns="columns" :dataSource="dataSource">
         <!-- 操作 -->
        <template slot="action" slot-scope="text, record, index">
          <a @click="edit(text, record, index)" v-isAuth="'sys:user:update'">编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除？" @confirm="() => del(text, record, index)">
            <a style="color:#f00" v-isAuth="'sys:user:delete'">删除</a>
          </a-popconfirm>
          <a-divider type="vertical"/>
          <a @click="info(text, record, index)" v-isAuth="'sys:user:info'">详情</a>
        </template>
      </a-table>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'crud',
  props: {
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    dataSource: {
      type: Array,
      default() {
        return []
      },
    },
    
  },
  data(){
    return {
    }
  }
}
</script>

<style scoped>
</style>