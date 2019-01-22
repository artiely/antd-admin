<template>
  <div>
    <a-card>
      <a-button-group>
        <a-button type="primary" @click="add">新增</a-button>
        <a-button type="primary" @click="edit" :disabled="selectKey.length!=1">编辑</a-button>
        <a-button type="danger" @click="del" :disabled="selectKey.length!=1">删除</a-button>
      </a-button-group>
      <a-directory-tree defaultExpandAll @select="onSelect" @expand="onExpand">
        <a-tree-node v-for="item in data" :key="item.menuId">
          <template slot="title">{{item.name}}</template>
          <a-tree-node v-for="sub in item.children" :key="sub.menuId">
            <template slot="title">{{sub.name}}</template>
            <a-tree-node v-for="lea in sub.children" :key="lea.menuId" isLeaf>
              <template slot="title">{{lea.name}}</template>
            </a-tree-node>
          </a-tree-node>
        </a-tree-node>
      </a-directory-tree>
      <add-or-update
        v-model="visible"
        :data="menuInfo"
        :isEdit="isEdit"
        :menuNav="menuNav"
        @handle-submit="handleSubmit"
      ></add-or-update>
    </a-card>
  </div>
</template>

<script>
import { treeDataTranslate } from '../../../utils/index'
import addOrUpdate from './add-or-update'
export default {
  components: {
    addOrUpdate,
  },
  data() {
    return {
      data: [],
      isEdit: false,
      menuInfo: {},
      visible: false,
      selectKey: [],
      menuNav: [],
      query: {
        page: 1,
        limit: 0,
      },
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
        this.data = treeDataTranslate(res, 'menuId')
      }
    },
    async getMenuNav() {
      let res = await this.$api.MENU_NAV()
      if (res.code === 0) {
        this.menuNav = res.menuList
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
    getMenuInfo() {
      return new Promise(async (resolve, reject) => {
        let res = await this.$api.MENU_INFO({ menuId: this.selectKey[0] })
        if (res.code === 0) {
          this.menuInfo = res.menu
          resolve(this.menuInfo)
        }
      })
    },
    handleSubmit(values, isEdit) {
      if (isEdit) {
        this.update({ ...this.menuInfo, ...values })
      }
    },
    handleCreate(values) {
      this.save(values)
    },
    handleUpdate(values) {
      this.update(values)
    },
    onSelect(keys) {
      console.log('Trigger Select', keys)
      this.selectKey = keys
    },
    onExpand() {
      console.log('Trigger Expand')
    },
    add() {
      this.visible = true
      this.isEdit = false
      this.menuInfo = {
        type: 1,
      }
      this.getMenuNav()
    },
    edit(text, record, index) {
      this.visible = true
      this.isEdit = true
      this.getMenuInfo()
      this.getMenuNav()
    },
    async del() {
      this.getMenuInfo().then(() => {
        let type = '目录'
        if (this.menuInfo.type === 0) {
          type = '目录'
        } else if (this.menuInfo.type === 1) {
          type = '菜单'
        } else if (this.menuInfo.type === 2) {
          type = '按钮'
        }
        let name = this.menuInfo.name
        this.$confirm({
          title: (
            <h3>您确定删除{' '}<a>{name} {type}</a>{' '}吗 ?</h3>
          ),
          content: '删除后将不可恢复，请谨慎操作！',
          onOk() {},
          onCancel() {},
        })
      })
    },
  },
}
</script>

<style scoped>
</style>