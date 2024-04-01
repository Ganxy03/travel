<template>
    <div class="headNav">
        <div @click="linkTo('/')" class="logo">
            <img src="http://ganxy03.cn/img/avatar.png" alt="">
        </div>
        <!-- <ul class="nav">
            <li v-for="item in navList" :key="item.label" class="navItem">{{ item.label }}</li>
        </ul> -->
        <TopNav class="topNav"/>
        <i @click="sideNav = true" class="el-icon-s-fold"></i>
        <el-drawer
        :visible.sync="sideNav"
        :direction="direction"
        :append-to-body=true
        size="60%">
        <SideNav />
        </el-drawer>
    </div>
</template>
<script>
import "@/assets/css/menu/headNav.css"
import SideNav from "@/components/menu/SideNav.vue"
import TopNav from "@/components/menu/TopNav.vue"
export default {
    components: {
        SideNav,
        TopNav
    },
    data() {
        return {
            navList: [
                {
                    label: '首页',
                    addr: '/'
                },
                {
                    label: '玩转八公',
                    addr: ''
                },
                {
                    label: '八公导航',
                    addr: ''
                },
                {
                    label: '购票指南',
                    addr: ''
                },
                {
                    label: '关于',
                    addr: ''
                }
            ],
            sideNav: false,
            direction: 'rtl',
        }
    },
    methods: {
        handleClose(done) {
            done()
        },
        linkTo(path) {
            const currentPath = this.$route.path;
            if (currentPath !== path) {
                this.$router.push(path).catch(err => console.log(err))
            }
        }
    }
}
</script>
