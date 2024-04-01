<template>
    <div class="relevancePage">
        <el-alert
        v-if="value == 1"
            title="这里是给文章关联封面图片的"
            type="success">
        </el-alert>
        <el-alert
            v-else
            title="已关联过的封面点击图片可修改关联"
            type="warning">
        </el-alert>
        <h2>关联图片</h2>
        <ul class="container">
            <el-select v-model="value">
                <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.label"
                :value="item.id">

                </el-option>
            </el-select>
            <li class="item" v-for="item in filteredData" :key="item.id">
                <span style="line-height: 60px;">{{ item.title }}</span>
                <span v-if="value == 1" @click="selectPic(item)">选择</span>
                
                <img @click="selectPic(item)" style="height: 60px;" v-else :src="item.cover" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import SelectPic from '@/components/manager/module/SelectPic.vue'
export default {
    data() {
        return {
            allArticle: [],
            value: 1,
            options: [
                {
                    id: 1,
                    label: '未分配'
                },
                {
                    id: 2,
                    label: '已分配'
                }
            ],
        }
    },
    created() {
        this.getAllArticle()
    },
    computed: {
        filteredData() {
            if (this.value === 2) {
                return this.allArticle.filter(article => article.cover);
            } else {
                return this.allArticle.filter(article => !article.cover);
            }
        }
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
                this.allArticle = res.data
                // console.log(this.allArticle)
            })
        },
        selectPic(item) {
            // console.log(item)
            localStorage.setItem('title', item.title)
            localStorage.setItem('sortId', item.sort)

            const h = this.$createElement;
            this.$msgbox({
            title: '选择图片',
            message: h('p', null, [
                h(SelectPic), // 将自定义组件嵌入到VNode中
                // h('span', null, '内容可以是 '),
                // h('i', { style: 'color: teal' }, 'VNode')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
                // eslint-disable-next-line
                beforeClose: (action, instance, done) => {
                    if (action === 'cancel') {
                        this.$msgbox.close();
                    } else if(action === 'confirm') {
                        // console.log("confirm")
                        this.$msgbox.close();
                    }
                }
            });
        }
    }
}
</script>

<style>
.relevancePage .container {
    height: calc(100vh - 120px - 64px - 64px);
    width: 70%;
    margin: 0 auto;
    padding: 0;
    /* background-color: blueviolet; */
    overflow-y: auto;
}
.relevancePage .container .item {
    height: 60px;
    margin: 12px 0;
    display: flex;
    line-height: 60px;
    justify-content: space-between;
}
.relevancePage .container .item span:nth-child(2) {
    cursor: pointer;
    color: rgb(45, 153, 240);
}
@media screen and (max-width: 768px) {
    .relevancePage .container {
        width: 100%;
    }
}
</style>