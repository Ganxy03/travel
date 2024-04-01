<template>
    <div class="SortList" v-loading.fullscreen.lock="fullscreenLoading">
        <el-alert
            title="删除分类后若发布内容 刷新一下 不然容易bug"
            type="warning">
        </el-alert>
        
        <el-select v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.id">
            </el-option>
        </el-select>
        <el-button @click="value = ''" size="mini">清空</el-button>
        <el-table
            :data="filteredData"
            stripe
            style="width: 100%">
            <el-table-column
            prop="label"
            label="类别/标题">
            </el-table-column>
            <el-table-column>
                <template slot="header">
                    <!-- <el-input size="mini" v-model="search" placeholder="输入关键字搜索">
                        <el-button @click="console" slot="append" icon="el-icon-search"></el-button>
                    </el-input> -->
                    <th>
                        <el-input size="mini" disabled v-model="search" placeholder="搜索暂不可用">
                            <el-button disabled @click="console" slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </th>
                </template>
                <el-table-column
                prop="total"
                label="数量/访问量">
                </el-table-column>
                <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button v-if="!value" @click="delItem(scope.row)" style="width: 100%;" type="text">删除</el-button>
                    <div v-else style="display: flex;">
                        <el-button @click="update(scope.row)" style="width: 100%;" type="text">修改</el-button>
                        <el-button @click="delArticle(scope.row)" style="width: 100%;" type="text">删除</el-button>
                    </div>
                </template>
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            tableData: [],
            value: '',
            options: [],
            search: '',
            allArticle: [],
            fullscreenLoading: false
        }
    },
    created() {
        this.getAllSort()
        this.getAllArticle()
    },
    computed: {
        filteredData() {
            if (this.value === "") {
                return this.tableData;
            } else {
                // console.log(this.value)
                // console.log(this.allArticle)
                // const filteredItem = this.allArticle.find(
                //     (item) => item.sort === this.value
                // );
                // console.log(filteredItem)
                // // return filteredItem ? [filteredItem] : [];
                // if (filteredItem) {
                //     const { title, hit, ...rest } = filteredItem;
                //     const modifiedItem = {
                //         label: title,
                //         total: hit,
                //         ...rest
                //     };
                //     return [modifiedItem];
                // } else {
                //     return [];
                // }
                const modifiedData = this.allArticle
                .filter((item) => item.sort === this.value)
                .map(({ title, hit, ...rest }) => ({
                    label: title,
                    total: hit,
                    ...rest,
                }));
                return modifiedData;
            }
        },
    },
    methods: {
        // console() {
        //     console.log(this.search)
        // },
        getAllSort() {
            const url = '/api/sort/getAll'
            axios.post(url,{
                    
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                this.tableData = res.data
                this.options = [...res.data];
            })
        },
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
        delItem(row) {
            if(row.total == 0) {
                const label = row.label
                const url = '/api/sort/delSort'
                axios.post(`${url}?label=${label}`,{

                    },
                    {
                    headers: {
                        'verifyCode': '2024'
                    }
                }).then((res) => {
                    if(res.status == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getAllSort()
                    }
                })
            } else {
                this.$message({
                    message: '数量不为0',
                    type: 'warning'
                })
            }
        },
        update(row) {
            // console.log(row)
            localStorage.setItem("title", row.label)
            localStorage.setItem("sort", row.sort)
            localStorage.setItem("content", row.content)
            localStorage.setItem("needUpdate", 'yes')
            location.reload()
        },
        delArticle(row) {
            console.log(row)

            const data = {
                sort: row.sort,
                title: row.label
            }
            const url = '/api/article/delete'
            this.fullscreenLoading = true
            axios.post(`${url}?sort=${data.sort}&title=${data.title}`, {}, {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                console.log(res)
                if(res.data == 'Delete success') {
                    setTimeout(function() {
                        this.getAllArticle()
                        this.fullscreenLoading = false
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                    }.bind(this), 1000)
                }
            })
        }
    }
}
</script>

<style>
.SortList {
    max-height: 70vh;
    overflow-y: auto;
}

</style>