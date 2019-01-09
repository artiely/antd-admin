<template>
  <div>
    <a-card>
      <div slot="title">
        <a-input placeholder="请输入文章标题" v-model="title"></a-input>
      </div>
      <mavon-editor v-model="content" style="z-index:2"/>
      <a-upload-dragger
        name="files"
        action="http://192.168.2.123:8080/api/upload"
        :multiple="true"
        :headers="{Authorization : `Bearer ${this.token}`}"
        :withCredentials="true"
        @change="handleChange"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox"/>
        </p>
        <p class="ant-upload-text">Click or drag file to this area to upload</p>
        <p
          class="ant-upload-hint"
        >Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
      </a-upload-dragger>
      <div slot="actions">
        <a-button type="primary" @click="save">保存</a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      title:'',
      content: '',
      attachment:'',
      token: Cookies.get('token')
    }
  },
  methods: {
    handleChange(info) {
      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
      console.log('info',info)
    },
    async save() {
      let res= await this.$api.POST_ARTICLE({title:this.title,content:this.content,attachment:this.attachment})
      if(!res.error){
        this.$message.success('保存成功');
      }
    }
  },
}
</script>
<style>
.v-note-wrapper .v-note-op.shadow{
  box-shadow: 0 0px 0px rgba(0,0,0,0.157), 0 0px 1px rgba(0,0,0,0.227)!important;
}
.v-note-wrapper .v-note-panel.shadow{
  box-shadow: 0 0px 0px rgba(0,0,0,0.157), 0 0px 1px rgba(0,0,0,0.227)!important;
}
</style>
