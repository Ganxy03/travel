<template>
    <div class="ManagerView">
        <HeadNav class="nav"/>
        
        <i @click="drawer = true" class="el-icon-s-unfold"></i>
        <div class="main">
            <SideNav class="sideNav"/>
            <div class="mainArea">
                <HomePage v-if="path == '/manager/home'"/>
                <PostPage v-if="path == '/manager/post'"/>
                <MaterialPage v-if="path == '/manager/material'"/>
                <RelevancePage v-if="path == '/manager/relevance'"/>
            </div>
        </div>
        <FootInfo class="foot"/>

        <el-drawer
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        size="200px">
        <SideNav />
        </el-drawer>
    </div>
</template>

<script>
import axios from 'axios'
import '@/assets/css/manager/ManagerView.css'
import HeadNav from '@/components/menu/HeadNav.vue'
import SideNav from '@/components/manager/SideNav.vue'

import HomePage from '@/components/manager/HomePage.vue'
import PostPage from '@/components/manager/PostPage.vue'
import FootInfo from '@/components/manager/FootInfo.vue'
import MaterialPage from '@/components/manager/MaterialPage.vue'
import RelevancePage from '@/components/manager/RelevancePage.vue'
export default {
    components: {
        HeadNav,
        SideNav,

        HomePage,
        PostPage,
        MaterialPage,
        RelevancePage,
        FootInfo
    },
    created() {
        this.path = localStorage.getItem('path')
        this.verifyLogin()
    },
    data() {
        return {
            path: '/manager/home',
            direction: 'ltr',
            drawer: false
        }
    },
    methods: {
      handleClose(done) {
        done()
      },
      verifyLogin() {
        const name = localStorage.getItem('name')
        const url = '/api/account/verify'
        axios.post(`${url}?name=${name}`,{
                
            },
            {
            headers: {
                'verifyCode': '2024'
            }
        }).then((res) => {
            console.log(res)
            if(res.data == "Invalid identity" || res.status == 500) {
                this.$router.push('/manager/login')
                this.$message({
                    message: '身份无效',
                    type: 'warning'
                })
            }
            // console.log(this.allArticle)
        })
      }
    }
}

</script>