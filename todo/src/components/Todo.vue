<template>
  <div class="content">

    <div class="form">
      <input type="text" placeholder="新的todo" @keyup="create($event)" v-model="newTodo">
    </div>

    <div class="center-main">
      <input type="checkbox" class="finish-all" @change="completedall($event)">
      <ul class="todo-list">
        <TodoItem v-for="item in todolist"
                  :itemkey="item"
                  :key="item.id"
                  @deleteclick="destroy(item.id)"
        >
        </TodoItem>
      </ul>
    </div>

    <footer>
      <div class="count"> {{activeCount}} 条未完成</div>
      <div class="buttons">
        <router-link to="/all" class="btn">所有</router-link>
        <router-link to="/active" class="btn">未完成</router-link>
        <router-link to="/completed" class="btn">已完成</router-link>
      </div>
      <button @click="destroyCompleted" class="btn clear-finish">清除已完成</button>
    </footer>
  </div>
</template>

<script>
  import TodoStor from '@/store'
  import TodoItem from './TodoItem'
  let ENTER_KEY = 13
  const filters = {
    all (_todos) {
      return _todos
    },
    active (_todos) {
      return _todos.filter(v => {
        return !v.completed
      })
    },
    completed (_todos) {
      return _todos.filter(v => {
        return v.completed
      })
    }
  }
  export default{
    name: 'todo',
    data () {
      return {
        newTodo: '',
        todos: TodoStor.select().sort((a, b) => { return b.id - a.id })
      }
    },
    watch: {
      todos: {
        deep: true,
        handler: TodoStor.update
      }
    },
    computed: {
      filtercode () {
        return this.$route.params.filter || 'all'
      },
      todolist () {
        return filters[this.filtercode](this.todos)
      },
      activeCount () {
        return this.todos.filter(v => {
          return !v.completed
        }).length
      }
    },
    methods: {
      create (e) {
        if (e.keyCode !== ENTER_KEY || !this.newTodo) {
          return
        }
        this.todolist.unshift({
          id: new Date().getTime(),
          content: this.newTodo,
          completed: false
        })
        this.newTodo = ''
        TodoStor.update(this.todolist)
      },
      destroy (_id) {
        this.todos = this.todos.filter(v => {
          return v.id !== _id
        })
      },
      destroyCompleted () {
        this.todos = this.todos.filter(v => {
          return !v.completed
        })
      },
      completedall (e) {
        this.todos.map(v => {
          v.completed = e.target.checked
        })
      }
    },
    components: { TodoItem }
  }
</script>

<style scopde>
  .content {
    background: #fff;
    box-shadow: 0 2px 10px #ccc,
    0 5px 10px 2px #ddd,
    0 5px 20px #ccc;
  }
  .form input[type=text] {
    width: 100%;
    font-size: 24px;
    padding: 10px 0 10px 45px;
    border:none;
  }
  .form input[type=text]::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  .form input[type=text]::-moz-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  .form input[type=text]:input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
  .center-main {
    position: relative;
  }
  .center-main .finish-all {
    position: absolute;
    top: -30px;
    left: 15px;
    transform: rotate(90deg);
    width:0;
    height:0;
    color: #eee;
  }
  .center-main .finish-all::after {
    content: '❯';
    opacity:1;
    font-size: 22px;
    position: absolute;
    top:-20px;
  }
  .center-main .finish-all:checked {
    color: #333;
  }
  .todo-list {
    border-top:1px solid #ccc;
  }
  a{
    text-decoration: none;
  }
  .btn {
    border:1px solid transparent;
    outline:none;
    background: transparent;
    color: #333;
    padding:2px 6px;
    border-radius:5px;
    cursor: pointer;
  }
  .btn.router-link-active {
    border:1px solid #ccc;
  }
  .btn:hover{
    border-color: #ccc;
  }
  footer{
    position: relative;
    padding:10px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
    0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2),
    0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
  footer .count {
    position: absolute;
    top:10px;
    left:5px;
  }
  footer .clear-finish{
    position: absolute;
    top:10px;
    right:5px;
  }
  footer .buttons{
    width:100%;
    text-align: center;
  }
</style>
