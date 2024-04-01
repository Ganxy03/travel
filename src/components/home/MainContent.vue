<template>
    <div class="mainContent">
        <el-row class="container">
            <el-row class="innerNav" :span="24">
                <el-col class="navItem" :span="8">
                    <img src="@/assets/img/home/nav/in_icon.png" alt="">
                    <span>门票购买</span>
                </el-col>
                <el-col class="navItem" :span="8">
                    <img src="@/assets/img/home/nav/in_icon1.png" alt="">
                    <span>开放时间</span>
                </el-col>
                <el-col class="navItem" :span="8">
                    <img src="@/assets/img/home/nav/in_icon2.png" alt="">
                    <span>周边小吃</span>
                </el-col>
            </el-row>
            <el-col class="leftBox" :span="16">
                <CarouselDemo />
                <!-- <ul v-for="item in boxTitle" :key="item.id" class="box_in">
                    <li class="boxItem">
                        <h3 class="title">
                            <span>{{ item.label }}</span>
                            <span @click="lookAll(item.id)" class="btn">查看全部</span>
                        </h3>
                        <CarouselDemo />
                    </li>
                </ul> -->
            </el-col>
            <el-col class="sideBar" :span="8">
                <el-card class="statistic">
                    <el-row>
                        <el-col class="item" :span="12">
                            <span class="label">浏览量</span>
                            <h3 class="num">295</h3>
                        </el-col>
                        <el-col class="item" :span="12">
                            <span class="label">讨论量</span>
                            <h3 class="num">472</h3>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card class="sideNav">
                    <h3 class="title">快捷导航</h3>
                    <ul class="nav">
                        <li class="navItem">门票购买</li>
                        <li class="navItem">开放时间</li>
                        <li class="navItem">周边小吃</li>
                    </ul>
                </el-card>
            </el-col>
        </el-row>
        
        <el-row class="currentActivies">
            <h3 class="title">当前活动</h3>
            <CarouselTwo />
        </el-row>
        <el-row class="bottomNav">
            <el-row>
                <el-col class="one" :span="24">
                    <div class="text">
                        <h3>门票购买</h3>
                        <p>点击前往购买门票</p>
                    </div>
                    <div class="btn">
                        门票购买
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col class="two" :span="12">
                    <div class="text">
                        <p>交通、停车</p>
                    </div>
                    <div class="bac">
                        <img src="@/assets/img/home/nav/in_box5_bj1.png" alt="">
                    </div>
                </el-col>
                <el-col class="two" :span="12">
                    <div class="text">
                        <p>客服电话</p>
                    </div>
                    <div class="bac">
                        <img src="@/assets/img/home/nav/in_box5_bj2.png" alt="">
                    </div>
                </el-col>
            </el-row>
        </el-row>
        <CommonFoot />
    </div>
</template>
<script>
import '@/assets/css/home/mainContent.css'
import CarouselDemo from '@/components/carousel/CarouselView.vue'
import CarouselTwo from '@/components/carousel/CarouselTwo.vue'
import CommonFoot from '@/components//foot/CommonFoot.vue'
import axios from 'axios'
export default {
    components: {
        CarouselDemo,
        CarouselTwo,
        CommonFoot
    },
    data() {
        return {
            boxTitle: [
                // {
                //     label: '123'
                // }
            ]
        }
    },
    created() {
        this.getAllSort()
    },
    methods: {
        getAllSort() {
            const url = '/api/sort/getAll'
            axios.post(url,{

            },{
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                // console.log(res)
                this.boxTitle = res.data
            })
        },
        lookAll(sort) {
            localStorage.setItem('sortId', sort)
            this.$router.push('/article/sort')
        }
    }
}
</script>