<template>

  <div id="app">
    <h1>{{title}}</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'todos'
    }
  }
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body{
    font-size: 14px;
    color: #333;
    font-family: Consolas,'Microsoft YaHei';
    background-color: #f5f5f5;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  #app {
    width: 550px;
    margin:20px auto;
  }
  h1 {
    text-align: center;
    font-size: 100px;
    opacity: 0.2;
  }
</style>
