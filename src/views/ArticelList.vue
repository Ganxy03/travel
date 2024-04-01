<template>
    <div class="articleList">
        <HeadNavVue class="nav"/>
        <el-alert
            title="此处异步加载返回数据存在问题"
            type="warning">
        </el-alert>
        <el-alert
            title="解决办法：再点一下就好了"
            type="warning">
        </el-alert>
        <ul class="sortLabel">
            <li @click="linkToSort(item.id)" :class="{active: item.id == sortIndex}" class="sortItem" v-for="item in sortData" :key="item.id">{{ item.label }}</li>
        </ul>
        <ul class="artice">
            <li class="item" v-for="item in filteredData" :key="item.id">
                <h3 @click="showArticle(item)">{{ item.title }}</h3>
                <img src="@/assets/img/home/carousel/350x300_1.png" alt="">
            </li>
        </ul>
        <FootInfo />
    </div>
</template>

<script>
import axios from 'axios'
import HeadNavVue from '@/components/menu/HeadNav.vue'
import FootInfo from '@/components/foot/CommonFoot.vue'
export default {
    components: {
        HeadNavVue,
        FootInfo
    },
    data() {
        return {
            sortData: [],
            articleData: [],
            sortIndex: ''
        }
    },
    async  created() {
        await this.getAllSort()
        await this.getAllArticle()
        this.linkSort()
    },
    computed: {
        // filteredData() {
        //     return this.filterData();
        // }
        /* eslint-disable */
        // async filteredData() {
        //     await this.getAllSort()
        //     await this.getAllArticle()
        //     console.log(this.sortIndex)
        //     console.log(this.articleData)
        //     // console.log(this.articleData.filter(item => item.sort === this.sortIndex))
        //     console.log(this.articleData.filter(item => item.sort === this.sortIndex))
        //     // 返回过滤后的数据
        //     return this.articleData.filter(item => item.sort === this.sortIndex);
        // },
        filteredData() {
            // console.log(this.sortIndex)
            // console.log(this.articleData)
            // console.log(this.articleData.filter(item => item.sort === this.sortIndex))
            // console.log(this.articleData.filter(item => item.sort === this.sortIndex))
            // 返回过滤后的数据
            return this.articleData.filter(item => item.sort === this.sortIndex);
        },
    },
    methods: {
        // async filterData() {
        //     await this.getAllSort()
        //     await this.getAllArticle()
        //     console.log(this.sortIndex)
        //     console.log(this.articleData)
        //     // console.log(this.articleData.filter(item => item.sort === this.sortIndex))
        //     console.log(this.articleData.filter(item => item.sort === this.sortIndex))
        //     // 返回过滤后的数据
        //     return this.articleData.filter(item => item.sort === this.sortIndex);
        // },
        getAllSort() {
            const url = '/api/sort/getAll'
            return new Promise((resolve, reject) => {
                axios.post(url, {}, {
                    headers: {
                    'verifyCode': '2024'
                    }
                }).then((res) => {
                    this.sortData = res.data;
                    if (localStorage.getItem('sortId') == null) {
                    // this.sortIndex = this.sortData[0].sort;
                    } else {
                    this.sortIndex = localStorage.getItem('sortId');
                    }
                    resolve(); // 异步操作完成，调用 resolve()
                }).catch(error => {
                    reject(error); // 异步操作出错，调用 reject()
                });
            });
            // axios.post(url,{
                    
            //     },
            //     {
            //     headers: {
            //         'verifyCode': '2024'
            //     }
            // }).then((res) => {
            //     this.sortData = res.data
            //     if(localStorage.getItem('sortId') == null) {
            //         this.sortIndex = this.sortData[0].sort
            //     } else {
            //         this.sortIndex = localStorage.getItem('sortId')
            //     }
                
            //     // console.log(res.data)
            // })
            // // const url = '/api/sort/getAll';
            // // const res = await axios.post(url, {}, {
            // //     headers: {
            // //         'verifyCode': '2024'
            // //     }
            // // });
            // // this.sortData = res.data;
        },
        getAllArticle() {
            const url = '/api/article/getAll'
            return new Promise((resolve, reject) => {
                axios.post(url, {}, {
                    headers: {
                        'verifyCode': '2024'
                    }
                }).then((res) => {
                    this.articleData = res.data;
                    resolve(); // 异步操作完成，调用 resolve()
                }).catch(error => {
                    reject(error); // 异步操作出错，调用 reject()
                });
            });
            // const url = '/api/article/getAll'
            // axios.post(url,{
                    
            //     },
            //     {
            //     headers: {
            //         'verifyCode': '2024'
            //     }
            // }).then((res) => {
            //     this.articleData = res.data

                
            //     // console.log(this.allArticle)
            // })
            // // const url = '/api/article/getAll';
            // // const res = await axios.post(url, {}, {
            // //     headers: {
            // //         'verifyCode': '2024'
            // //     }
            // // });
            // // this.articleData = res.data;
            // // if (localStorage.getItem('sortId') == null) {
            // //     this.sortIndex = this.sortData[0].sort;
            // // } else {
            // //     this.sortIndex = localStorage.getItem('sortId');
            // // }
        },
        linkToSort(id) {
            this.sortIndex = id
            localStorage.setItem('sortId', id)
        },
        linkSort() {
            setTimeout(function() {
                // console.log(localStorage.getItem('sortId'))
                this.sortIndex = localStorage.getItem('sortId')
            }, 1000)
        },
        showArticle(item) {
            console.log(item)
            localStorage.setItem('title', item.title)
            this.$router.push('/article')
        }
    }
}
</script>

<style>
.articleList body {
    
}
.articleList .nav {
    background-color: rgb(56, 141, 215);
}
.articleList .sortLabel {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
    list-style: none;
    width: 60%;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
}
.articleList .sortItem {
    font-size: 20px;
    cursor: pointer;
}
.articleList .sortItem:hover {
    border-bottom: 2px solid rgb(51, 169, 224);
}
.active {
    border-bottom: 2px solid rgb(51, 169, 224);
}
.articleList .artice {
    min-height: calc(100vh - 70px - 62px - 102px);
    width: 60%;
    padding: 0;
    margin: 0 auto;
    list-style: none;
    text-align: left;
}
.articleList .artice .item {
    height: 90px;
    line-height: 90px;
    display: flex;
    justify-content: space-between;
}
.articleList .artice .item h3 {
    cursor: pointer;
}
.articleList .artice .item img {
    height: 80px;
    width: 55%;
    margin-top: 5px;
}
@media screen and (max-width: 768px) {
    .articleList .sortLabel {
        width: 90%;
    }
    .articleList .sortItem {
        font-size: 18px;
    }
    .articleList .artice {
        width: 90%;
    }
}
</style>