<template>
    <div>
        <el-menu
        default-active="1"
        @open="handleOpen"
        @close="handleClose">
            <el-menu-item @click="linkTo('/')" index="1">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <!-- <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">玩转八公</span>
            </el-menu-item> -->
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>玩转八公</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">文化历史</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">名胜古迹</template>
                    <el-menu-item index="2-3">选项1</el-menu-item>
                    <el-menu-item index="2-4">选项2</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <!-- <el-submenu index="2">
                <template slot="title">玩转八公</template>
                <el-menu-item index="2-1">文化历史</el-menu-item>
                <el-menu-item index="2-2">名胜古迹</el-menu-item>
                <el-menu-item index="2-3">游览路线</el-menu-item>
                <el-menu-item index="2-4">周边特色</el-menu-item>
            </el-submenu> -->
            <el-menu-item index="3">
                <i class="el-icon-location"></i>
                <span slot="title">八公导航</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-document"></i>
                <span slot="title">购票指南</span>
            </el-menu-item>
            <el-menu-item index="5">
                <i class="el-icon-question"></i>
                <span slot="title">关于</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>

  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      linkTo(path) {
        this.$router.push(path).catch(err => console.log(err))
      }
    }
  }
</script>