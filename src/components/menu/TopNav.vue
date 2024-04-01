<template>
    <div class="topNav">
        <el-menu :default-active="activeIndex" background-color="rgba(255, 255, 255, 0)" text-color="#fff" active-text-color="#ffd04b" mode="horizontal">
            <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">玩转八公</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-menu-item index="2-4">选项4</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">八公导航</el-menu-item>
            <el-menu-item index="4">购票指南</el-menu-item>
            <el-menu-item index="5">关于</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
.topNav {
  margin: 0 36px;
}
.topNav .el-menu {
  height: 70px;
}
.topNav .el-menu.el-menu--horizontal {
  border-bottom: none;
}
.topNav .el-menu .el-menu-item {
  height: 70px;
  line-height: 70px;
  font-size: 24px;
}
.topNav .el-menu--horizontal>.el-submenu .el-submenu__title{
  height: 70px;
  line-height: 70px;
  font-size: 24px;
}
.topNav .el-menu--popup {
  background-color: #fff;
}
</style>