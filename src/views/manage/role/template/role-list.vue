<template>
  <div style="background:#f8f8f8">
    <div class="role-list" v-for="(item,i) in dataSource" :key="item.id+i">
      <div class="role-list-body">
        <div class="role-list-body-left">
          <a-progress type="circle" :percent="item.level" :width="50"/>
        </div>
        <div class="role-list-body-mid">
          <h3>
            {{item.roleName}}
            <a-tag color="blue" v-if="item.sex ==1 ">男</a-tag>
            <a-tag color="pink" v-if="item.sex ==2 ">女</a-tag>
          </h3>
          <div>
            <div class="role-block">
            <a-icon type="heart"/>爱好：
            <span v-for="v in item.like" :key="v">
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
</div><div class="role-block">
            <a-icon type="tags"/>技能：
            <span v-for="v in item.skill" :key="v">
              <a-badge
                v-if="v ==1 "
                status="processing"
                text="javascript"
                style="margin-right:10px"
              ></a-badge>
              <a-badge v-if="v ==2 " status="processing" text="html" style="margin-right:10px"></a-badge>
              <a-badge v-if="v ==3 " status="processing" text="css"></a-badge>
            </span>
            </div>
          </div>
          <div class="textover1" style="width:100px">

            <a-icon type="file-text"/>
            简介：{{item.remark}}
          </div>
          <div>
            <div class="role-block">
            <a-icon type="clock-circle"/>
            创建时间：{{item.createTime}}
            
            </div>
            <div class="role-block">
              <a-icon type="clock-circle"/>
            入职时间： {{item.addTime}}
            </div>
          </div>
        </div>
        <div class="role-list-body-right"></div>
      </div>
      <div class="role-list-footer clearfix">
          <a class="pull-left" @click="edit(item, item, i)"  v-isAuth="'sys:role:update'">更多</a>
        <div class="role-list-footer-action pull-right">
        <a @click="edit(item, item, i)"  v-isAuth="'sys:role:update'">编辑</a>
        <a-divider type="vertical"/>
        <a-popconfirm title="确定删除？" @confirm="() => del(item, item, i)">
          <a style="color:#f00" v-isAuth="'sys:role:delete'">删除</a>
        </a-popconfirm>
        <a-divider type="vertical"/>
        <a @click="info(item, item, i)" v-isAuth="'sys:role:info'">详情</a>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'role-list',
  props: {
    dataSource: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    edit(item, e) {
      this.$emit('edit', item, e)
    },
    del(item, e) {
      this.$emit('del', item, e)
    },
    info(item, e) {
      this.$emit('info', item, e)
    },
  },
}
</script>

<style scoped lang="less">
.role-list {
  border-left: 4px solid #f60;
  margin-bottom: 10px;
  background: #fff;
  .role-block{
    display: inline-block;
  }
  
  .role-list-body {
    padding: 10px;
    display: flex;
    .role-list-body-left {
      width: 100px;
      text-align: center;
      vertical-align: middle;
      line-height: 100px;
    }
    .role-list-body-mid {
      flex: 1;
    }
    .role-list-body-right {
      width: 100px;
    }
  }
  .role-list-footer {
    background: #fff;
    padding: 10px;
    .role-list-footer-action{
  }
  }
}
</style>