<template>
  <a-card>
    <main id="todolist">
      <h1>
        Todo List
        <span>Get things done, one item at a time.</span>
      </h1>
      <div class="todolist-wrapper">
        <div class="todoitem">
          <div class="todo-label">给吴老师先修车</div>
          <div class="todo-action">
            <a-checkbox :checked="false" title="完成"></a-checkbox>
            <a-icon type="delete" title="删除" />
          </div>
        </div>
      </div>

    </main>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      newitem: '',
      sortByStatus: false,
      isactive: false,
      todo: [
        { id: 1, label: 'Learn VueJs', done: true },
        { id: 2, label: 'Code a todo list', done: false },
        { id: 3, label: 'Learn something else', done: false },
      ],
    }
  },
  computed: {
    todoByStatus: function() {
      if (!this.sortByStatus) {
        return this.todo
      }

      var sortedArray = []
      var doneArray = this.todo.filter(function(item) {
        return item.done
      })
      var notDoneArray = this.todo.filter(function(item) {
        return !item.done
      })

      sortedArray = [...notDoneArray, ...doneArray]
      return sortedArray
    },
  },
  methods: {
    onToogle: function() {
      this.$emit('clicked', this.isactive)
    },
    addItem: function() {
      this.todo.push({
        id: Math.floor(Math.random() * 9999) + 10,
        label: this.newitem,
        done: false,
      })
      this.newitem = ''
    },
    markAsDoneOrUndone: function(item) {
      item.done = !item.done
    },
    deleteItemFromList: function(item) {
      let index = this.todo.indexOf(item)
      this.todo.splice(index, 1)
    },
    clickontoogle: function(active) {
      this.sortByStatus = active
    },
  },
}
</script>
<style scoped lang="less">
#todolist {
  padding: 2rem 3rem 3rem;
  max-width: 500px;
  background: #ff6666;
  color: #fff;
}
#todolist h1 {
  /*text-align:center;*/
  font-weight: normal;
  font-size: 2.6rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #eee;
}
#todolist h1 span {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.7rem;
  margin-left: 3px;
  margin-top: 0.2rem;
}
.todolist-wrapper {
  .todoitem {
    height: 60px;
    line-height: 60px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    .todo-label {
      flex: 1;
      color: #fff;
      font-size: 20px;
      padding-left: 10px;
    }
    .todo-action {
      width: 100px;
      display: flex;
      justify-content: space-around;
      // justify-items: center;
      .anticon-delete {
        line-height: 60px;
        cursor: pointer;
      }
    }
  }
}
</style>
