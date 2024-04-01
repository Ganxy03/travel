<template>
<ul class="selectPic" style="display: flex; flex-wrap: wrap; justify-content: space-between;padding: 0;">
    <li style="width: 45%; list-style: none; display: flex; justify-content: center; align-items: center;" v-for="(item, index) in picData" :key="index">
        <img @click="selectImg(item)" style="max-width: 100%; max-height: 100%; object-fit: contain;" :src="item" alt="">
    </li>
</ul>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            picData: [],
            totalItemsCount: 0
        }
    },
    created() {
        this.getAllPic()
    },
    methods: {
        getAllPic() {
            const url = '/api/file/listFiles'
            axios.post(url, {
                
            }, {
            headers: {
                'verifyCode': '2024'
            }
            }).then((res) => {
                this.picData = res.data
                this.totalItemsCount = res.data.length
                // console.log(res.data)
            });
        },
        selectImg(cover) {
            console.log(cover)
            const url = '/api/article/selectImage'
            axios.post(`${url}?sort=${localStorage.getItem('sortId')}&title=${localStorage.getItem('title')}&url=${cover}`, {
                
            }, {
            headers: {
                'verifyCode': '2024'
            }
            }).then((res) => {
                if(res.data == 'Select success') {
                    this.$message({
                        message: '关联成功',
                        type: 'success'
                    })
                }
                location.reload()
                // console.log(res.data)
            });
        }
    }
}
</script>

<style>
.el-message-box__message {
    height: 60vh;
    overflow-y: auto;
}
</style>