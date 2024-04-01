<template>
    <div class="MaterialPage">
        <h2>素材库</h2>
        <div>
            <ul class="localNav">
                <li class="navItem" :class="{ active: activeNavItem === '图片' }">
                    <span @click="activeNavItem = '图片'">图片</span>
                </li>
                <li class="navItem" :class="{ active: activeNavItem === '视频' }">
                    <span @click="activeNavItem = '视频'">视频</span>
                </li>
                <li class="navItem" :class="{ active: activeNavItem === '音频' }">
                    <span @click="activeNavItem = '音频'">音频</span>
                </li>
            </ul>
            <div v-if="activeNavItem === '图片'" class="materialCard pic">
                <el-alert
                    v-if="isMobileDevice"
                    title="不支持移动设备上传素材"
                    type="warning">
                </el-alert>
                <div style="display: flex;justify-content: space-between;">
                    <h3 class="title">图片<small>(共{{ totalItemsCount1 }}条)</small></h3>
                    <!-- <Button v-if="!isMobileDevice" icon="pi pi-cloud-upload" label="上传" class="p-button-text" /> -->
                    <!-- <FileUpload v-if="!isMobileDevice" mode="basic" name="demo[]" url="/api/file/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" :auto="true" chooseLabel="Browse" /> -->
                    <div v-if="!isMobileDevice">
                        <input type="file" @change="handleFileUpload" multiple />
                        <button @click="submitFiles">提交文件</button>
                    </div>
                </div>
                <ul class="picBox">
                    <li class="pic-item" v-for="(item, index) in filteredData" :key="index" :style="{ backgroundImage: 'url(' + item + ')' , backgroundRepeat: 'no-repeat'}">
                        <!-- <img :src="item" alt=""> -->
                    </li>
                </ul>
                <el-empty v-if="picData == ''"></el-empty>
                <div style="position: fixed;position: relative;">
                    <Paginator style="position: absolute;bottom: 0;right: 0;" :rows="rowsPerPage" :totalRecords="totalItemsCount1" @page="onPage($event)"></Paginator>
                </div>
            </div>
            <div v-if="activeNavItem === '音频'" class="materialCard video">
                <div style="display: flex;justify-content: space-between;">
                    <h3 class="title">音频<small>(共{{ totalItemsCount2 }}条)</small></h3>
                    <Button icon="pi pi-cloud-upload" label="上传" class="p-button-text" />
                </div>
                <el-empty description="暂不支持音频文件"></el-empty>
            </div>
            <div v-if="activeNavItem === '视频'" class="materialCard audio">
                <div style="display: flex;justify-content: space-between;">
                    <h3 class="title">视频<small>(共{{ totalItemsCount3 }}条)</small></h3>
                    <Button icon="pi pi-cloud-upload" label="上传" class="p-button-text" />
                </div>
                <el-empty description="暂不支持视频文件"></el-empty>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            activeNavItem: '图片',
            totalItemsCount1: 0,
            rowsPerPage: 10,
            currentPage: 1,
            totalItemsCount2: 0,
            totalItemsCount3: 0,
            isMobileDevice: false,
            picData: [],
            files: [],
        }
    },
    created() {
        this.isMobileDevice = this.checkIsMobile();
        this.getAllPic()
    },
    computed: {
        filteredData() {
            const startIndex = (this.currentPage - 1) * this.rowsPerPage;
            const endIndex = startIndex + this.rowsPerPage;
            return this.picData.slice(startIndex, endIndex);
        }
    },
    methods: {
        checkIsMobile() {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            return isMobile;
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        onPage(event) {
            console.log(event.page)
            this.currentPage = event.page+1
        },
        getAllPic() {
            const url = '/api/file/listFiles'
            axios.post(url, {
                
            }, {
            headers: {
                'verifyCode': '2024'
            }
            }).then((res) => {
                this.picData = res.data
                this.totalItemsCount1 = res.data.length
                // console.log(res.data)
            });
        },
        handleFileUpload(event) {
            this.files = event.target.files;
        },
        submitFiles() {
        const formData = new FormData();
        for (let i = 0; i < this.files.length; i++) {
            // formData.append("files", this.files[i]);
            formData.append("file", this.files[i]);
        }
        axios.post("/api/file/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'verifyCode': '2024'
            },
            })
            .then((response) => {
                
                if(response.status == 200) {
                    console.log(response);
                    this.$message({
                        message: '上传成功',
                        type: 'success'
                    })
                    this.getAllPic()
                }
                
            })
            .catch((error) => {
                console.error("文件上传失败", error);
                this.$message({
                    message: '上传失败',
                    type: 'warning'
                })
            });
        },
    }
};
</script>
<style>
.MaterialPage .localNav {
    padding: 12px;
    margin: 0 24px;
    list-style: none;
    display: flex;
    border-bottom: 1px solid #e0e1e2;
}
.MaterialPage .localNav .navItem {
    margin: 0 6px;
}
.MaterialPage .localNav .navItem span {
    padding: 12px 16px;
    cursor: pointer;
}
.MaterialPage .localNav .navItem span:hover {
    color: #07C160;
    /* border-bottom: 2px solid #07C160; */
}
.MaterialPage .localNav .navItem.active span {
    color: #07C160;
    border-bottom: 2px solid #07C160;
}

.MaterialPage .materialCard {
    height: calc(100vh - 70px - 24px - 60px - 90px - 45px);
    margin-top: 10px;
    padding: 12px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    overflow-y: auto;
}
.MaterialPage .materialCard .title {
    font-size: 20px;
    font-weight: 400;
    margin: 12px 0 0 36px;
    color: #1A1B1C;
}
.pi-download {
    /* transform: rotate(-180deg); */
}
.picBox {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
}
.picBox .pic-item {
    list-style: none;
    /* width: 100%; */
    width: calc(100% / 6);
    height: 300px;
    background-size: contain;
    margin: 0 12px;
    background-position: center;
}
.picBox .pic-item:hover {
    border: 1px solid #e3e3e3;
}
.picBox .pic-item img {
    
}
@media screen and (max-width: 768px) {
    .picBox .pic-item {
        width: calc(100% / 2.5);
        height: 220px;
    }
}
</style>