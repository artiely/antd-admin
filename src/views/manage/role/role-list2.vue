<template>
  <div>
    <div>
      <a-alert message="form-generator 全示例演示" type="error" closable/>
      <v-crud
        :sourceColumns="sourceColumns"
        :dataSource="data"
        :asyncRow="asyncRow"
        :asyncCols="asyncCols"
        @handle-edit="edit"
        @handle-add="add"
      >
        <template slot-scope="tableData">
          <a-button
            type="primary"
            data-type="add"
            style="margin:10px 0;"
            v-isAuth="'sys:role:save'"
          >新增</a-button>
          <a-table :columns="tableData.columns" :dataSource="tableData.dataSource">
            <!-- 操作 -->
            <template slot="action" slot-scope="text, record, index">
              <a data-type="edit" :data-index="index" v-isAuth="'sys:role:update'">编辑</a>
              <a-divider type="vertical"/>
              <a-popconfirm title="确定删除？" @confirm="() => del(text, record, index)">
                <a
                  style="color:#f00"
                  data-type="delete"
                  :data-index="index"
                  v-isAuth="'sys:role:delete'"
                >删除</a>
              </a-popconfirm>
              <a-divider type="vertical"/>
              <a @click="info(text, record, index)" v-isAuth="'sys:role:info'">详情</a>
            </template>
            <!-- roleName -->
            <template slot="roleName" slot-scope="text, record, index">
              <a-tag color="#f50" v-if="record.roleId ==1 ">{{record.roleName}}</a-tag>
              <a-tag color="green" v-else>{{record.roleName}}</a-tag>
            </template>
            <!-- sex -->
            <template slot="sex" slot-scope="text, record, index">
              <a-tag color="blue" v-if="record.sex ==1 ">男</a-tag>
              <a-tag color="pink" v-else>女</a-tag>
            </template>
            <!-- sex -->
            <template slot="like" slot-scope="text, record, index">
              <span v-for="v in record.like" :key="v">
                <a-tag v-if="v ==1 ">
                  <v-icon name="icon-lanqiu" symbol/>篮球
                </a-tag>
                <a-tag v-if="v ==2 ">
                  <v-icon name="icon-zuqiu" symbol/>足球
                </a-tag>
                <a-tag v-if="v ==3 ">
                  <v-icon name="icon-diqiu" symbol/>地球
                </a-tag>
              </span>
            </template>
            <!-- skills -->
            <template slot="skill" slot-scope="text, record, index">
              <span v-for="v in record.skill" :key="v">
                <a-badge
                  v-if="v ==1 "
                  status="processing"
                  text="javascript"
                  style="margin-right:10px"
                ></a-badge>
                <a-badge v-if="v ==2 " status="processing" text="html" style="margin-right:10px"></a-badge>
                <a-badge v-if="v ==3 " status="processing" text="css"></a-badge>
              </span>
            </template>
            <!-- level -->
            <template slot="level" slot-scope="text, record, index">
              <a-progress :percent="record.level" status="active" size="small"/>
            </template>
            <!-- remark -->
            <template slot="remark" slot-scope="text, record, index">
              <a-tooltip placement="topLeft" :title="record.remark" arrowPointAtCenter>
                <div class="textover1" style="min-width:100px;max-width:200px">{{record.remark}}</div>
              </a-tooltip>
            </template>
          </a-table>
        </template>
      </v-crud>
    </div>
  </div>
</template>

<script>
import roleList from './role'
import roleInfo from './role-info'
// import moment from 'moment'
// import role from './template/role-list'
const sourceColumns = [
  {
    title: 'roleId',
    dataIndex: 'roleId',
    hidden: true,
    formOptions: {
      el: 'input',
      visible: false,
    },
  },
  {
    title: '职位',
    width: 120,
    dataIndex: 'roleName',
    scopedSlots: { customRender: 'roleName' },
    formOptions: {
      el: 'select',
      rules: [{ required: true, message: '请选择职位!' }],
      placeholder: '请选择职位',
      options: [
        { label: '前端工程师', value: '前端工程师' },
        { label: 'java工程师', value: 'java工程师' },
        { label: '测试工程师', value: '测试工程师' },
      ],
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 200,
    scopedSlots: { customRender: 'remark' },
    formOptions: {
      el: 'input',
      rules: [{ message: '请备注角色名称含义!' }],
      placeholder: '请备注角色名称含义',
    },
  },
  {
    title: '简介',
    dataIndex: 'remark',
    hidden: true,
    formOptions: {
      el: 'textarea',
      placeholder: '请输入简介',
    },
  },
  {
    title: '级别',
    dataIndex: 'level',
    scopedSlots: { customRender: 'level' },
    formOptions: {
      el: 'slider',
      values: { 0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F' },
    },
  },
  {
    title: '性别',
    width: 60,
    dataIndex: 'sex',
    scopedSlots: { customRender: 'sex' },
    formOptions: {
      el: 'radio',
      options: [{ label: '男', value: 1 }, { label: '女', value: 0 }],
    },
  },
  {
    title: '兴趣爱好',
    dataIndex: 'like',
    width: 220,
    scopedSlots: { customRender: 'like' },
    formOptions: {
      el: 'checkbox',
      options: [
        { label: '篮球', value: 1 },
        { label: '足球', value: 2 },
        { label: '地球', value: 3 },
      ],
    },
  },
  {
    title: '技能',
    dataIndex: 'skill',
    width: 200,
    scopedSlots: { customRender: 'skill' },
    formOptions: {
      el: 'select',
      type: 'multiple',
      options: [
        { label: 'javascript', value: 1 },
        { label: 'html', value: 2 },
        { label: 'css', value: 3 },
      ],
      rules: [{ message: '请选择技能!', required: true }],
      placeholder: '请选择技能',
    },
  },
  {
    title: '评估',
    width: 60,
    dataIndex: 'rate',
    hidden: true,
    formOptions: {
      el: 'rate',
      value: 5,
    },
  },
  {
    title: '在职状态',
    dataIndex: 'status',
    hidden: true,
    formOptions: {
      el: 'switch',
      value: true,
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    hidden: true,
    formOptions: {
      visible: false,
    },
  },
  {
    title: '入职时间',
    dataIndex: 'addTime',
    hidden: true,
    formOptions: {
      el: 'datepicker',
      format: 'YYYY-MM-DD',
      rules: [{ required: true, message: '请选择入职时间!' }],
    },
  },
  {
    title: '合同期限',
    dataIndex: 'pactTime',
    hidden: true,
    formOptions: {
      el: 'datepicker',
      type: 'range',
      format: 'YYYY-MM-DD',
      rules: [{ required: true, message: '请选择合同期限!' }],
    },
  },
  {
    title: '权限',
    dataIndex: 'menuIdList',
    key: 'menuIdList',
    hidden: true,
    formOptions: {
      el: 'tree',
      values: [],
      rules: [{ required: true, message: 'Please input username!' }],
    },
  },
]
export default {
  components: {
    // role,
  },
  data() {
    return {
      sourceColumns,
      data: [],
      loading: false,
      query: {
        page: 1,
        limit: 10,
      },
      totalCount: 0,
      menuList: [],
      row: {},
      asyncRow: {},
      asyncCols: [],
      title: '',
      icon: '',
      formVisible: false,
      isEdit: false,
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
  computed: {
    columns() {
      return this.sourceColumns
        .filter(v => {
          if (!v.hidden) {
            return v
          }
        })
        .slice(0, 7)
        .concat([
          {
            title: '操作',
            key: 'operation',
            width: 200,
            scopedSlots: { customRender: 'action' },
          },
        ])
    },
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      setTimeout(() => {
        let res = roleList
        this.loading = false
        if (res.code === 0) {
          this.data = res.page.list.map(v => {
            v.menuIdList = []
            return v
          })
          this.totalCount = res.page.totalCount
        }
      }, 1000)
    },
    handleSubmit(values) {
      let str = JSON.stringify(values)
      if (this.isEdit) {
        alert('编辑结果>>>>>>>>>>>>>>' + str)
      } else {
        alert('保存结果>>>>>>>>>>>>>>' + str)
      }
    },
    handlePage(current, size) {
      this.query.page = current
      this.query.limit = size
    },
    edit(text, record, index) {
      let res = roleInfo

      setTimeout(() => {
        if (res.code === 0) {
          this.asyncCols = [
            {
              dataIndex: 'menuIdList',
              formOptions: {
                values: this.$store.state.role.menuList,
              },
            },
          ]
          // 请求当前行的权限数据，然后设置成默认值
          this.asyncRow = { menuIdList: res.role.menuIdList }
        }
      }, 1000)
    },
    add() {
      let res = roleInfo

      setTimeout(() => {
        if (res.code === 0) {
          this.asyncCols = [
            {
              dataIndex: 'menuIdList',
              formOptions: {
                values: this.$store.state.role.menuList,
              },
            },
          ]
          // 新增时设置的默认值(管理员所有)
          this.asyncRow = {
            menuIdList: res.role.menuIdList,
          }
        }
      }, 1000)
    },
    del(text, record, index) {
      alert('删除' + index)
    },
    info(text, record, index) {
      alert('打开详情' + index)
    },
  },
}
</script>

<style scoped>
</style>