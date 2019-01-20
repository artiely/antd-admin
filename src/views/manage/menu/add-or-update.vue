<template>
  <div v-if="value">
    <a-modal :visible="value" @ok="handleOk" @cancel="handleCancel">
      <div slot="title">
        <h3 v-if="isEdit">
          <a-icon type="form"></a-icon> 编辑
        </h3>
        <h3 v-else>
          <a-icon type="plus-square" /> 新增
        </h3>
      </div>
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item label='类型' :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-radio-group :disabled="isEdit" name="radioGroup" v-model="type">
            <a-radio :value="0">目录</a-radio>
            <a-radio :value="1">菜单</a-radio>
            <a-radio :value="2">按钮</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-if="type==0" label='目录名称' :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-input v-decorator="[
          'name',
          {rules: [{ required: true, message: '必填！' }],initialValue: data.name}
        ]" 
        
        placeholder="目录名称"/>
        </a-form-item>
        <!-- 菜单 -->
        <template v-else-if="type==1">
          <a-form-item label='菜单名称' :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
            <a-input v-decorator="[
          'name',
          {rules: [{ required: true, message: '必填！' }],initialValue: data.name}
        ]" 
        placeholder="菜单名称"/>
          </a-form-item>
          <a-form-item label='菜单url' :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
            <a-input v-decorator="[
          'url',
          {rules: [{ required: true, message: '必填！' }],initialValue: data.url}
        ]" 
        placeholder="菜单url"/>
          </a-form-item>

        </template>
        <a-form-item v-else-if="type==2" label='按钮名称' :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-input v-decorator="[
          'name',
          {rules: [{ required: true, message: '必填！' }],initialValue: data.name}
        ]" placeholder="按钮名称"/>
        </a-form-item>
        <a-form-item v-if="type==0||type==1" label='排序' :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-input-number v-decorator="[
          'orderNum',
          {initialValue: data.orderNum}
        ]" placeholder="排序"/>
        </a-form-item>
        <a-form-item v-if="type==1" label='上级目录' :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-select v-decorator="[
          'parentId',
          {rules: [{ required: true, message: '必填！' }],initialValue: data.parentId}
        ]"
         placeholder="上级目录">
            <a-select-option :value="item.menuId" v-for="item in menuNav" :key="item.menuId">{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="type==2" label='上级菜单' :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-select v-decorator="[
          'parentId',
          {rules: [{ required: true, message: '必填！' }],initialValue: data.parentId}
        ]" placeholder="上级菜单">
            <a-select-opt-group v-for="item in menuNav" :key="item.menuId">
              <span slot="label">
                <a-icon type="user" />{{item.name}}</span>
              <a-select-option :value="sub.menuId" v-for="sub in item.list" :key="sub.menuId">{{sub.name}}</a-select-option>
            </a-select-opt-group>
          </a-select>
        </a-form-item>
        <a-form-item v-if="type==1||type==2" label='授权标识' :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-input v-decorator="[
          'perms',
          {rules: [{ required: true, message: '必填！' }],initialValue: data.perms}
        ]" placeholder="英文逗号分隔，如 sys:user:info,sys:user:update"/>
        </a-form-item>
        <a-form-item v-if="type==0" label='目录图标' :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-input v-decorator="[
          'icon',
          {initialValue: data.icon}
        ]"  placeholder="目录图标"/>
        </a-form-item>
        <a-form-item v-if="type==1" label='菜单图标' :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-input v-decorator="[
          'icon',
          {initialValue: data.icon}
        ]"  placeholder="菜单图标"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    data: {
      type: Object,
      define() {
        return {}
      },
    },
    isEdit: Boolean,
    menuNav: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      type: 1,
      form: this.$form.createForm(this),
      tree: [],
    }
  },
  watch: {
    data: {
      handler(val) {
        if (val) {
          this.type = this.data.type
          console.log('xxx', this.type, this.data.type)
        }
      },
      deep: true,
    },
  },
  methods: {
    handleOk() {},
    handleCancel() {
      this.$emit('input', false)
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
  
  },
}
</script>

<style>
</style>
