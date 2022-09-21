<template>
    <div class="login-wrap animated fadeInUp" :style="{ backgroundImage: `url(${background_path})` }">
        <div :class="styleData.qf_login">
            <div class="ms-title">
                <div :class="styleData.qf_logo">
                    <img class="qf-logo2" :src="logo_path" alt="轻流" />
                </div>
            </div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名/手机号/邮箱" size="medium">
                        <!-- <el-button slot="prepend" icon="el-icon-lx-people"></el-button> -->
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="param.password" @keyup.enter.native="submitForm()" size="medium">
                        <!-- <el-button slot="prepend" icon="el-icon-lx-lock"></el-button> -->
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <!-- <el-button type="primary" @click="submitForm()">登录</el-button> -->
                    <el-button type="login" @click="submitForm()" class="login-button"
                        ><p
                            style="
                                color: #ffffff;
                                font-family: PingFang SC;
                                font-style: normal;
                                font-weight: 500;
                                font-size: 16px;
                                line-height: 16px;
                            "
                        >
                            登录
                        </p></el-button
                    >
                </div>
                <p class="login-tips">
                    <!-- <span style="color: #767E89;" @click="login">注册账号</span>｜<span style="color: #767E89">忘记密码？</span> -->
                    <!-- <span style="color: #767E89;" @click="login">注册账号</span>｜ -->
                    <a class="forgetpwd" routerlink="/passport/reset" href="/passport/reset" style="color: #767e89">忘记密码？</a>
                </p>
            </el-form>
        </div>
        <div class="footer-bottom">
            <div :class="styleData.qf_footer">
                <ul class="footer-column-a">
                    <template v-for="(item, index) in footerData">
                        <li :key="index">
                            <a :hre="item.href" v-if="item.href == 'javascript:;'">
                                <img :srfc="item.img" style="float: left" />
                                <p style="float: left; height: 20px; line-height: 20px; margin: 0px 0px 0px 5px; color: #fff">
                                    {{ item.text }}
                                </p></a
                            >
                            <a :href="item.href" v-else target="_blank">
                                <img :src="item.img" style="float: left" />
                                <p style="float: left; height: 20px; line-height: 20px; margin: 0px 0px 0px 5px; color: #fff">
                                    {{ item.text }}
                                </p></a
                            >
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    data: function () {
        return {
            styleData: {
                // qf_logo:'qf-logo_left',
                // qf_login:'ms-login_right',
                // qf_footer:'footer-bottom-center',
                // background_path:'../../assets/img/login-bg.jpg',
                // login_url:'https://accounts.qingflow.com/api/user/login'
            },
            logo_path: '',
            background_path: '',
            footerData: [],
            param: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    // mounted(){
    //     this.getData();
    // },

    created() {
        this.getData();
    },
    methods: {
        // submitForm() {
        //     this.$refs.login.validate(valid => {
        //         if (valid) {
        //             this.$message.success('登录成功');
        //             localStorage.setItem('ms_username', this.param.username);
        //             this.$router.push('/');
        //         } else {
        //             this.$message.error('请输入账号和密码');
        //             console.log('error submit!!');
        //             return false;
        //         }
        //     });
        // },
        getData() {
            fetchData().then((res) => {
                this.styleData = res.data.styleData;
                this.footerData = res.data.footerData;
                this.logo_path = require('../../assets/img/' + res.data.logo_path);
                this.background_path = require('../../assets/img/' + res.data.background_path);
            });
        },
        submitForm() {
            if (this.param.username == '' || this.param.password == '') {
            } else {
                this.$axios
                    .post(this.styleData.login_url, {
                        username: this.param.username,
                        password: this.param.password
                    })
                    .then((res) => {
                        if (res.data.msg == 'success') {
                            this.$message.success('登录成功');
                            localStorage.setItem('username', res.data.data.username);
                            localStorage.setItem('leavel', res.data.data.leavel);

                            this.$router.push('/');
                        } else {
                            this.$message.error(res.data.msg);
                            return false;
                        }
                    });
            }
        },
        cancel() {
            this.open = false;
        }
    }
};
</script>
<style scoped>
/* ../../assets/img/login-bg.jpg */
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}

.test {
    position: absolute;
    left: 70%;
    top: 50%;
}

.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fb9337;
    border-bottom: 1px solid #ddd;
    border-bottom: 0;
    margin-bottom: 18px;
}

/* 登录框的不同位置的配置 */
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    /* width: 350px; */
    width: 436px;
    height: 410px; /*之前的并没有*/
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.85);
    background: #fff;
    overflow: hidden;
}

.ms-login_left {
    position: absolute;
    left: 30%;
    top: 50%;
    /* width: 350px; */
    width: 436px;
    height: 410px; /*之前的并没有*/
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.85);
    background: #fff;
    overflow: hidden;
}
.ms-login_right {
    position: absolute;
    left: 70%;
    top: 50%;
    /* width: 350px; */
    width: 436px;
    height: 410px; /*之前的并没有*/
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.85);
    background: #fff;
    overflow: hidden;
}

/* logo的左中不同配置 */

.qf-logo_center {
    width: 133px;
    height: 40px;
    padding-left: 32px;
    padding-top: 56px;
    margin-left: 25%;
}

.qf-logo_left {
    width: 133px;
    height: 40px;
    padding-left: 32px;
    padding-top: 56px;
    /* padding-top: 20px; */
    /* padding-left: 10px; */
}
.qf-logo2 {
    max-width: 100%;
    max-height: 100%;
    margin-left: 0px;
}

.ms-content {
    padding: 30px 32px;
}

.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-top: 8px;
    background: #fb9337;
    border: 0;
}
.login-tips {
    font-family: PingFang SC;
    font-size: 14px;
    line-height: 22px;
    color: #767e89;
    text-align: center;
    margin-top: 24px;
}

.el-button--login {
    border-radius: 4px;
    background: #fb9337;
    border: none;
}
.el-button--login:hover {
    border-radius: 4px;
    background: #fba458;
    border: none;
}
/* .el-form-item{
    margin-bottom: 16px;
} */

/* 底部左中右位置修改 */
.footer-bottom {
    position: absolute;
    /* width: 1440px; */
    width: 100%;
    left: 0px;
    height: 102px;
    bottom: 0px;
    left: 0px;
    background: rgba(18, 19, 21, 0.3);
    display: flex;
}

.footer-bottom-left {
    /* width: 480px; */
    margin-left: 0%;
    width: 33.3%;
    height: 102px;
    text-align: center;
}
.footer-bottom-center {
    margin: 0 auto;
    width: 33.3%;
    height: 102px;
    text-align: center;
}
.footer-bottom-right {
    margin-right: 0%;
    width: 34.4%;
    height: 102px;
    text-align: center;
}
ul li {
    list-style: none;
}

.footer-column-a {
    /* position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 51px; */
    position: absolute;
    top: 0;
    bottom: 0;
    margin-top: 15px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #ffffff;
    display: inline-block;
    /* text-align: center; */
}
</style>
