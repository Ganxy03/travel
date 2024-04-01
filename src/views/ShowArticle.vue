<template>
    <div class="showArticle">
        <HeadNavVue class="nav"/>
        <div class="showArea">
            <!-- <h3 class="title">{{ articleData.title }}</h3> -->
            <div class="content" v-html="articleData.content"></div>
        </div>
        <CommonFoot />
    </div>
</template>
<script>
import axios from "axios";
import HeadNavVue from "@/components/menu/HeadNav.vue";
import CommonFoot from "@/components/foot/CommonFoot.vue";
export default {
    components: {
        HeadNavVue,
        CommonFoot
    },
    data() {
        return {
            articleData: {
                
            }
        }
    },
    created() {
        this.getArticle()
    },
    methods: {
        getArticle() {
            const url = '/api/article/getEach'
            axios.post(`${url}?sort=${localStorage.getItem('sortId')}&title=${localStorage.getItem('title')}`,{
                    
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                this.articleData = res.data
                
                
                // console.log(res.data)
            })
        }
    }
}
</script>
<style>
.showArticle {

}
.showArticle .nav {
    background-color: rgb(56, 141, 215);
}
.showArticle .showArea {
    width: 70%;
    min-height: calc(100vh - 70px - 62px);
    margin: 0 auto;
    /* background-color: aqua; */
}
.showArticle .showArea .title {
    font-size: 32px;
}
.showArticle .showArea .content {
    text-align: left;
}
.showArticle .showArea .content p {
    text-indent: 2em;
    margin: 0 0 16px;
}
.showArticle .showArea .content h1,h2,h3,h4,h5 {
    text-align: center;
    padding-bottom: 6px;
    line-height: 42px;
    color: #1F2328;
    margin: 24px 0 16px;
    padding: 0 0 7.2px;
    font-size: 24px;
    border-bottom: 1px solid hsla(210,18%,87%,1);
}
.showArticle .showArea .content blockquote {
    color: #656076;
    border-left: .25em solid #d0d7de;
    margin: 0 0 16px;
    padding: 0 16px;
}
.showArticle .showArea .content pre {
    padding: 16px;
    background: #F6F8FA;
    color: #1F2328;
    overflow-x: auto;
    border-radius: 5px;
}
.showArticle .showArea .content ul {
    color: #1F2328;
    margin: 0 0 16px;
    padding: 0 0 0 32px;
}
.showArticle .showArea .content img {
    width: 100%;
}
.showArticle .showArea .content a {
    color: #0969DA;
}
.showArticle .showArea .content code {
    display: block;
    width: 100%;
    word-wrap: break-word;
}
@media screen and (max-width: 768px) {
    .showArticle .showArea {
        width: 90%;
    }
    .showArticle .showArea .title {
        font-size: 24px;
    }
}
</style>