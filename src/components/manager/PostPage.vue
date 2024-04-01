<template>
    <div class="PostPage" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="btnGroup">
            <div>
                <el-select v-model="value" placeholder="请选择分类">
                    <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                    </el-option>
                </el-select>
                <div>
                    <el-button @click="newSort" type="text">新建分类</el-button>
                    <el-button @click="sortList" type="text">分类列表</el-button>
                </div>
            </div>
            <Button v-if="!isUpdate" @click="postBtn" label="发布" class="p-button-text" />
            <!-- <Button v-else @click="updateBtn" label="修改" class="p-button-text" /> -->
            <div v-else style="display: flex;">
                <el-button @click="cancelUpdate" type="text">取消</el-button>
                <el-button @click="updateBtn" type="text">修改</el-button>
            </div>
            <!-- <Button @click="updateBtn" label="修改" class="p-button-text" /> -->
        </div>
        <el-alert
            title="请不要在编辑器里选择图片 后端会bug"
            type="warning">
        </el-alert>
        <!-- <Editor v-model="html" editorStyle="height: calc(100vh - 70px - 24px - 100px - 100px - 45px);">
            <template #toolbar>
                <span class="ql-formats">
                    <button class="ql-background"></button>
                    <button class="ql-bold"></button>
                    <button class="ql-color"></button>
                    <button class="ql-italic"></button>
                    <button class="ql-link"></button>
                    <button class="ql-underline"></button>
                    <button class="ql-blockquote"></button>
                    <button class="ql-align"></button>
                    <button class="ql-direction"></button>
                    <button class="ql-code-block"></button>
                    下面不能用
                    <button class="ql-font"></button>
                    <button class="ql-code"></button>
                    <button class="ql-Size"></button>
                    <button class="ql-strike"></button>
                    <button class="ql-script"></button>
                    <button class="ql-header"></button>
                    <button class="ql-indent"></button>
                    <button class="ql-list"></button>
                    <button class="ql-image" @click="uploadImage"></button>
                </span>
            </template>
        </Editor> -->
        <Editor v-model="html" editorStyle="height: calc(100vh - 70px - 24px - 100px - 100px - 45px);">
            <!-- <template #toolbar>
            <span class="ql-formats">
                <button class="ql-bold" v-tooltip.bottom="'Bold'"></button>
                <button class="ql-italic" v-tooltip.bottom="'Italic'"></button>
                <button class="ql-underline" v-tooltip.bottom="'Underline'"></button>
            </span>
            </template> -->
        </Editor>
    </div>
</template>

<script>
import axios from 'axios'
import SortList from '@/components/manager/module/SortList.vue'
import NewSort from '@/components/manager/module/NewSort.vue'
export default {
    components: {
        // eslint-disable-next-line
        SortList,
        // eslint-disable-next-line
        NewSort
    },
    data() {
        return {
            html: '',
            value: '',
            title: '',
            options: [],
            isMsgBoxVisible: true,
            newLabel: '',
            fullscreenLoading: false,
            isUpdate: false,
        }
    },
    created() {
        this.getAll()
        this.monitorUpdate()
        this.isUpdate = localStorage.getItem('needUpdate') ? true : false;
    },
    methods: {
        uploadImage() {
            // 创建FormData对象，用于封装上传的图片数据
            const formData = new FormData();
                formData.append('file', this.selectedFile); // 'file'是后端接口接收文件的字段名

                // 调用后端接口上传图片
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
                    });
                    // 获取返回的图片地址
                    const imageUrl = response.data.url; // 'url'是后端接口返回图片地址的字段名
                    // 将图片地址保存在数据模型中
                    this.imageUrl = imageUrl;
                    // 在富文本编辑器中插入图片
                    this.insertImage(imageUrl);
                }
                })
                .catch((error) => {
                console.error("文件上传失败", error);
                this.$message({
                    message: '上传失败',
                    type: 'warning'
                });
            });
        },
        getAll() {
            const url = '/api/sort/getAll';
            return new Promise((resolve, reject) => {
                axios.post(url, {
                
                }, {
                headers: {
                    'verifyCode': '2024'
                }
                }).then((res) => {
                this.options = res.data;
                resolve(res.data);
                }).catch((error) => {
                reject(error);
                });
            });
        },
        async monitorUpdate() {
            if(localStorage.getItem("needUpdate") == 'yes') {
                this.title = localStorage.getItem("title")
                this.html = localStorage.getItem("content")
                this.value = localStorage.getItem("sort")
                
                // console.log(this.getAll())
                // await this.getAll().then(data => {

                // });
                try {
                    const options = await this.getAll();
                    // console.log(options);
                    const foundOption = options.find(option => option.id === parseInt(this.value));
                    if (foundOption) {
                        this.value = foundOption.label;
                    }
                } catch (error) {
                    console.error(error);
                }
                // console.log(JSON.parse(JSON.stringify(this.options)));
            }
        },
        postBtn() {
            if(this.value == '') {
                this.$message({
                    message: '没有分类',
                    type: 'warning'
                })
            } else if(this.html == '') {
                this.$message({
                    message: '没有内容',
                    type: 'warning'
                })
            } else {
                console.log(this.html)
                console.log(this.value)
                this.$prompt('请输入文章标题', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    callback: (action, value) => {
                        if(action == 'confirm' && value.inputValue == null) {
                            
                            this.$message({
                                type: 'warning',
                                message: '标题不能为空'
                            });
                            return
                        } else if(action == 'cancel') {
                            return
                        } else {
                            this.title = value.inputValue
                            const data = {
                                title: this.title,
                                sort: this.value,
                                content: this.html
                            }
                            const url = '/api/article/post'
                            this.fullscreenLoading = true
                            axios.post(url, data, {
                                headers: {
                                    'verifyCode': '2024'
                                }
                            }).then((res) => {
                                console.log(res)
                                if(res.data == 'Article already exists') {
                                        setTimeout(function() {
                                            this.fullscreenLoading = false
                                            this.$message({
                                                message: '文章已存在',
                                                type: 'warning'
                                            })
                                        }.bind(this), 1000)
                                } else if(res.data == 'Post success') {
                                    setTimeout(function() {
                                        this.fullscreenLoading = false
                                        this.$message({
                                            message: '发布成功',
                                            type: 'success'
                                        })
                                        
                                    }.bind(this), 1000)
                                    
                                    this.title = '',
                                    this.value = '',
                                    this.html = ''
                                }
                            })
                        }
                    }
                })
            }
        },
        async updateBtn() {
            try {
                const options = await this.getAll();
                console.log(options);
                const foundOption = options.find(option => option.label === this.value);
                if (foundOption) {
                    this.value = foundOption.id;
                }
            } catch (error) {
                console.error(error);
            }
            const data = {
                content: this.html,
                sort: this.value,
                title: this.title
            }
            // console.log(data)
            this.fullscreenLoading = true
            const url = '/api/article/update'
            axios.post(url, data, {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                console.log(res)
                setTimeout(function(){
                    if(res.data == 'Update success') {
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        })
                        this.fullscreenLoading = false
                        this.html = '',
                        this.title = '',
                        this.value = ''
                        localStorage.removeItem('needUpdate')
                        localStorage.removeItem('content')
                        localStorage.removeItem('title')
                        localStorage.removeItem('sort')
                        this.isUpdate = false
                    }
                }.bind(this), 1000)
            })
        },
        cancelUpdate() {
            this.html = '',
            this.title = '',
            this.value = ''
            localStorage.removeItem('needUpdate')
            localStorage.removeItem('content')
            localStorage.removeItem('title')
            localStorage.removeItem('sort')
            this.isUpdate = false
        },
        newSort() {
            this.$prompt('请输入分类名称', '新建', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                callback: (action, value) => {
                    if(value._data.inputValue == null) {
                        if(action == 'cancel') {
                            this.$message.close(); 
                            return
                        }
                        this.$message({
                            type: 'warning',
                            message: '不能为空'
                        });
                        this.newSort()
                        return
                    } else if(value._data.inputValue != null && action == 'cancel') {
                        this.$message.close(); 
                        this.$message({
                            type: 'info',
                            message: '取消2'
                        });
                    } else {
                        this.newLabel = value._data.inputValue
                        // console.log(this.newLabel)
                        this.$confirm(`确定添加${value._data.inputValue}为新分类吗？`, '提示', {
                            
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            callback: function(action) {
                                if (action === 'confirm') {
                                    const label = this.newLabel
                                    const url = '/api/sort/newSort'
                                    axios.post(`${url}?label=${label}`,{
                    
                                        },
                                        {
                                        headers: {
                                            'verifyCode': '2024'
                                        }
                                    }).then((res) => {
                                        if(res.data == 'New success') {
                                            const vm = this;
                                            vm.$message({
                                                message: '创建成功',
                                                type: 'success'
                                            })
                                        }
                                        this.getAll()
                                    })
                                }
                            }.bind(this)
                        })
                    }
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消'
                });       
            });
        },
        sortList() {
            const h = this.$createElement;
            this.isMsgBoxVisible = true;
            this.$msgbox({
            title: '分类列表',
            message: h('p', null, [
                h(SortList), // 将自定义组件嵌入到VNode中
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
.PostPage .btnGroup {
    display: flex;
    justify-content: space-between;
}
@media screen and (max-width: 960px) {
    .el-message-box {
        width: 96%;
    }
}
</style>