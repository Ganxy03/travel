<template>  
    <div class="slider-container">  
        <div v-for="item in sortList" :key="item.id" class="slider-wrapper slider">  
            <div style="display: flex;justify-content: space-between;">
                <h3 style="text-align: left;color: #fff;">{{ item.label }}</h3>
                <span style="color: #fff;" @click="showMore">查看更多</span>
            </div>
            <div>
                <div>  
                    <!-- <img style="width: 45%;" :src="filteredItem.cover" alt=""> -->
                    <el-carousel height="220px">
                        <el-carousel-item v-for="filteredItem in filteredData(item.id)" :key="filteredItem.id">
                            <!-- <h3 class="small">{{ filteredItem }}</h3> -->
                            <img @click="showArticle(filteredItem)" class="itemPic" :src="filteredItem.cover" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>  
        </div>  
    </div>  
</template> 
    
    <script>
    import axios from 'axios';
    import 'slick-carousel/slick/slick.css';
    import 'slick-carousel/slick/slick-theme.css';
    import $ from 'jquery'
    import 'slick-carousel';
    export default {
    data() {
        return {
            sliderItems: [],
            sortList: [],
        };
    },
    computed: {
      filteredData() {
        // return this.sliderItems.filter(item => item.sort === 11);
        return (sortId) => {
            // console.log(this.sliderItems.filter(item => item.sort === sortId))
            return this.sliderItems.filter(item => item.sort === sortId);
        };
      }
    },
    mounted() {

        // $('#slider').slick(); // 初始化轮播图
        // this.$nextTick(() => {
        //     $(this.$el).find('#slider').slick();
        // });
        this.sortList.forEach((item, index) => {  
            const slider = this.$refs[`slickSlider_${item.id}`][index];  
            $(slider).slick({  
                // 这里添加你的slick配置选项  
                infinite: true,  
                speed: 300,  
                slidesToShow: 1,  
                slidesToScroll: 1,  
                // 其他配置项...  
            });  
        });   
    },
    created() {
        this.getAllArticle()
        this.getAllSort()
    },
    methods: {
        getAllArticle() {
            const url = '/api/article/getAll'
            axios.post(url,{
                    
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                this.sliderItems = res.data
                // console.log(res.data)
                // console.log(this.allArticle)
            })
        },
        getAllSort() {
            const url = '/api/sort/getAll'
            axios.post(url,{
    
            },{
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                // console.log(res.data)
                this.sortList = res.data
            })
        },
        showArticle(item) {
            console.log(item)
            localStorage.setItem('title', item.title)
            localStorage.setItem('sortId', item.sort)
            this.$router.push('/article')
        },
        showMore() {
            this.$router.push('/article/sort')
        }
    }
    };
    </script>
    
    <style scoped>
    /* 在样式中定义轮播图容器的宽度、高度等样式 */
    .slider-container {
    width: 100%;
    height: 220px;
    }
    .slider-wrapper {  
        /* 定义每个轮播图容器的样式 */  
        position: relative; /* 确保轮播图在容器中正确显示 */  
        width: 100%; /* 或者你需要的宽度 */  
        overflow: hidden; /* 隐藏超出容器的内容 */  
    }  
    /* 定义每个轮播项的样式 */
    .slider-item {
    width: 100%;
    height: 100%;
    }
    .slider-item img {
        display: inline-block;
        height: 220px;
    }
    .itemPic {
        height: 100%;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: rgba(255, 255, 255, 0);
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: rgba(255, 255, 255, 0);
    }
    @media screen and (max-width: 768px) {
        .itemPic {
            width: 100%;
        }
    }
    </style>
    