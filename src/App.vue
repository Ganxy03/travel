<template>
  <div id="app">
    <el-backtop style="right: 20px; bottom: 20px;font-weight: 700;font-size: 24px;background-color: #42b983;"
    ><i class="icon_up"></i>
    </el-backtop>
    <router-view/>
  </div>
</template>

<style>
* {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.icon_up {
  background: url(@/assets/img/app/top.png) 50% no-repeat;
  /* transform: rotate(180deg); */
  position: absolute;
  padding: 40px;
}
</style>
