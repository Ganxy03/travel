<template>
    <div class="manager-SideNav">
        <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item @click="linkToPost('/manager/home', 1)" index="1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item @click="linkToPost('/manager/post', 2)" index="2">
            <i class="el-icon-document"></i>
            <span slot="title">发布内容</span>
        </el-menu-item>
        <el-submenu index="3">
            <template slot="title">
            <i class="el-icon-s-data"></i>
            <span>内容与互动</span>
            </template>
            <el-menu-item-group>
            <template slot="title">素材库</template>
            <el-menu-item @click="linkToPost('/manager/material', '3-1')" index="3-1">图片</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="轮播选择">
            <el-menu-item @click="linkToPost('/manager/relevance', '3-2')" index="3-2">关联图片</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <!-- <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
        </el-menu-item> -->
        </el-menu>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '3-1'
      }
    },
    created() {
      if(localStorage.getItem("index")) {
        this.activeIndex = localStorage.getItem("index")
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      linkToPost(path, index) {
        if(path != localStorage.getItem("path")) {
          localStorage.setItem("path", path)
          // this.activeIndex = index
          localStorage.setItem("index", index)
          location.reload()
        }
      }
    }
  }
</script>
<style>
.manager-SideNav .el-menu-vertical-demo {
    text-align: left;
    height: calc(100vh - 70px);
}
</style>