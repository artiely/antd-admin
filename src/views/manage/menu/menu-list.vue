<template>
    <div>
    
     <a-directory-tree
    multiple
    defaultExpandAll
    @select="onSelect"
    @expand="onExpand"
  >
    <a-tree-node v-for="item in data" :title="item.name" :key="item.menuId">
      <a-tree-node :title="sub.name" v-for="sub in item.children"  :key="sub.menuId" >
        <a-tree-node :title="lea.name" v-for="lea in sub.children"  :key="lea.menuId"  isLeaf ></a-tree-node>
      </a-tree-node>
    </a-tree-node>
  </a-directory-tree>
  <pre>{{data}}</pre>
  </div>
</template>

<script>
import { treeDataTranslate } from '../../../utils/index'
export default {
  data() {
    return {
     data:[]
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
      console.log('123', res)
      if (res) {
        this.data = treeDataTranslate(res,'menuId')
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
     onSelect (keys) {
      console.log('Trigger Select', keys);
    },
    onExpand () {
      console.log('Trigger Expand');
    },
  },
}
</script>

<style scoped>
</style>