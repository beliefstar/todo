<template>
  <li>
    <input type="checkbox" class="finish"
           v-model="itemkey.completed"
           @change="complete($event)"
    >
    <label>{{itemkey.content}}</label>
    <button @click="deleted" class="delete">&times;</button>
  </li>
</template>

<script>
  export default{
    name: 'TodoItem',
    props: ['itemkey'],
    methods: {
      complete (e) {
        this.itemkey.completed = e.target.checked
      },
      deleted () {
        this.$emit('deleteclick')
      }
    }
  }
</script>

<style scopde>
  @keyframes showitem {
    from{
      transform: translateY(-20px);
      opacity:0;
    }
    to{
      transform: translateY(0);
      opacity:1;
    }
  }
  .todo-list li {
    padding: 15px 5px;
    border-bottom:1px solid #ccc;
    position: relative;
    animation: showitem 0.5s both;
  }
  .todo-list li span {
    display: none;
  }
  .todo-list li input{
    position: relative;
    margin: 0 25px 0 10px;
    width:0;
    height:0;
  }
  .todo-list li input::after {
    content: '';
    position: absolute;
    top: -15px;
    left: -8px;
    border: 1px solid #ccc;
    width:20px;
    height:20px;
    border-radius: 50%;
  }
  .todo-list li input:checked::after {
    background: #23ef42;
  }
  .todo-list li input:checked +label{
    color: #ccc;
    text-decoration: line-through;
  }
  .todo-list li button {
    position: absolute;
    top:12px;
    right: 10px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 30px;
    color: red;
    display: none;
  }
  .todo-list li:hover button{
    display: block;
  }
  .todo-list li label{
    font-size: 20px;
  }
</style>
