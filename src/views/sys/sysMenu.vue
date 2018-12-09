<template>
  <div>
    <a-card>
      <a-tree showLine :defaultExpandedKeys="['0-0-0']" @select="onSelect">
        <a-tree-node :key="item.menuId+''" v-for="item in data">
          <span slot="title" style="color: #1890ff">{{item.name}}</span>
          <a-tree-node :key="sub.menuId+''" v-for="sub in item.children" @dblclick.native="edit(sub)">
            <div class="sub-menu-tree" slot="title">{{sub.name}}
              <a-icon class="pull-right tree-icon-right" type="edit" />
            </div>
            <a-tree-node :title="leaf.name" :key="leaf.menuId+''" v-for="leaf in sub.children" />
          </a-tree-node>
        </a-tree-node>
      </a-tree>
    </a-card>
    <pre>
      <!-- {{data}} -->
    </pre>
    <a-modal title="Basic Modal" v-model="visible" @ok="handleOk">
      <a-form :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" label='类型' fieldDecoratorId="type" :fieldDecoratorOptions="{rules: [{ required: true}]}">
          <a-radio-group :options="options" :defaultValue="value" />
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" label='目录名称' fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入目录名称'}]}">
          <a-input placeholder='目录名称' type="text" />
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" label='排序号' fieldDecoratorId="newPassword" >
          <a-input-number :min="1" :max="100" />
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" label='菜单图标' fieldDecoratorId="newPassword" >
          <a-input placeholder='菜单图标' type="text" @click="visible2=true"/>
        </a-form-item>
      </a-form>
    </a-modal>
     <a-modal title="请选择图标" v-model="visible2" @ok="handleOk">
       <sys-icon></sys-icon>
    </a-modal>
  </div>
</template>

<script>
import { treeDataTranslate } from '@/utils'
import sysIcon from './sysIcon'
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}
const formTailLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18, offset: 6 }
}
const options = [
  { label: '目录', value: '1' },
  { label: '菜单', value: '2' },
  { label: '按钮', value: '3' }
]
export default {
  components: {
    sysIcon
  },
  data() {
    return {
      data: [],
      formItemLayout,
      formTailLayout,
      options,
      value: '2',
      visible: false,
      visible2: false
    }
  },
  methods: {
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    edit() {
      this.visible = true
      // alert(1)
    },
    handleOk(e) {
      this.visible = false
    },
    getData() {
      this.$store.dispatch('getMenuList').then(result => {
        this.data = treeDataTranslate(result, 'menuId')
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style  lang="less">
.sub-menu-tree {
  width: 150px;
  .tree-icon-right {
    line-height: 24px;
    display: none;
  }
  &:hover {
    .tree-icon-right {
      display: block;
    }
  }
}
</style>
