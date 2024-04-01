<template>
    <div class="loginContainer" v-loading.fullscreen.lock="fullscreenLoading">
        <headNav class="nav"/>
        <div class="loginForm">
            <h2>登陆</h2>
            <div class="box">
                <span class="p-float-label">
                    <InputText id="username" type="text" v-model="username" />
                    <label for="username">用户名</label>
                </span>
                <span class="p-float-label">
                    <InputText id="username" type="password" v-model="pwd" />
                    <label for="username">密码</label>
                </span>
                <el-row>
                    <el-col :span="16">
                        <span class="p-float-label">
                            <InputText id="username" type="password" v-model="verityCode" />
                            <label for="username">验证码</label>
                        </span>
                    </el-col>
                    <el-col :span="8">
                        <img style="width: 100%;margin-top: 36px;height: 38.67px;" @click="generateCaptcha" :src="yan_picUrl"/>
                    </el-col>
                </el-row>
                <div class="btn">
                    <Button @click="guestLogin" label="游客访问" class="p-button-link" />
                    <Button @click="loginBtn" label="一键登陆" class="p-button-raised p-button-text" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import headNav from '@/components/menu/HeadNav.vue'

import '@/assets/css/login/loginView.css'
export default {
    components: {
        headNav
    },
    data() {
        return {
            username: 'admin',
            pwd: '123456',
            verityCode: '',

            yan_picUrl: '',
            yan_captcha: '',
            fullscreenLoading: false
        }
    },
    created() {
        this.generateCaptcha()
    },
    methods: {
        generateCaptcha() {
            const img_w = 100;
            const img_h = 38.67;
            const char_len = 4;
            const font = '25px Arial';

            const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
            let code = '';
            for (let i = 0; i < char_len; i++) {
            code += char[Math.floor(Math.random() * char.length)];
            }
            // console.log(code)
            const canvas = document.createElement('canvas');
            canvas.width = img_w;
            canvas.height = img_h;
            const ctx = canvas.getContext('2d');

            // 背景色
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, img_w, img_h);

            // 画点
            for (let i = 0; i < 300; i++) {
            ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
            ctx.beginPath();
            ctx.arc(Math.random() * img_w, Math.random() * img_h, 1, 0, 2 * Math.PI);
            ctx.fill();
            }

            // 画线
            for (let i = 0; i < 10; i++) {
            ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
            ctx.beginPath();
            ctx.moveTo(Math.random() * img_w, Math.random() * img_h);
            ctx.lineTo(Math.random() * img_w, Math.random() * img_h);
            ctx.stroke();
            }

            // 画矩形
            ctx.fillStyle = 'rgba(144, 144, 144, 0.8)';
            ctx.fillRect(0, 0, img_w, img_h);

            // 写文字
            ctx.font = font;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100}, 1)`;
            const textWidth = ctx.measureText(code).width;
            ctx.fillText(code, (img_w - textWidth) / 2, (img_h + parseInt(font) - 20) / 2);
            // ctx.fillText(code, (textWidth), (textWidth));

            this.yan_captcha = code
            // console.log(this.captcha)
            // console.log(canvas.toDataURL('image/png'));
            this.yan_picUrl = canvas.toDataURL('image/png')
        },
        guestLogin() {
            this.username = 'admin',
            this.pwd = '123456',
            this.verityCode = this.yan_captcha
        },
        loginBtn() {
            if(this.verityCode == '') {
                this.$message({
                    message: '验证码为空',
                    type: 'warning'
                })
            } else if(this.verityCode != this.yan_captcha) {
                this.$message({
                    message: '验证码错误',
                    type:'warning'
                })
                this.generateCaptcha()
            } else {
                this.fullscreenLoading = true;
                const data ={
                    name: this.username,
                    pwd: this.pwd,
                }
                const url = '/api/account/login'
                // console.log(url)
                axios.post(`${url}?name=${data.name}&pwd=${data.pwd}`,{
                        
                    },
                    {
                    headers: {
                        'verifyCode': '2024'
                    }
                }).then((res) => {
                    if(res.status == 200 && res.data != 'Account not found, or pwd is wrong!') {
                        localStorage.setItem("token", res.data)
                        localStorage.setItem("name", this.username)
                        localStorage.setItem("path", "/manager/material")
                        localStorage.setItem("index", "3-1")
                        setTimeout(function() {
                            this.fullscreenLoading = true;
                            this.$router.push("/manager")
                            this.$message({
                                message: '登陆成功',
                                type: 'success'
                            })
                        }.bind(this), 1500)
                    } else {
                        setTimeout(function() {
                            this.username = ''
                            this.pwd = ''
                            this.verityCode = ''
                            this.$message({
                                message: '密码错误或账号不存在',
                                type: 'warning'
                            })
                            this.fullscreenLoading = false;
                        }.bind(this), 1500)
                        
                    }
                })
            }
        }
    }
}
</script>