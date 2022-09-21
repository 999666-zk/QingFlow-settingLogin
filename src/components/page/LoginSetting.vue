<template>
    <div
        class="login-wrap"
        :style="{
            backgroundImage: `url(${imgObj.flag == false ? Imgs[Imgs.length - 1] : Imgs[aroundNum]})`,
            width: `${100 - changeWidth}%`
        }"
        style="transition: all 0.3s ease-in; background-size: cover"
        @click.stop="hiddenRight"
    >
        <div class="right-box">
            <test
                ref="child"
                @openBox="openB"
                @closeBox="closeB"
                @pullData="getAllData"
                @loginwaycheck="getway"
                @footArea="getTopData"
                @sendImgs="getImgs"
                @allright="getBlu"
                @theNewImg="getNewImg"
                @logo="getlogo"
                @pubkey="getpubkey"
            ></test>
        </div>
        <div class="main-box"></div>
        <!-- main -->
        <div :class="styleData.qf_login" :style="styleData.login_type === 'passportsso' ? 'height:50rem' : 'height:45rem'">
            <div class="ms-title">
                <div :class="styleData.qf_logo">
                    <img class="qf-logo2" :src="logo_path" alt="轻流" />
                </div>
            </div>
            <div class="login-box" v-if="styleData.login_type === 'passportsso' || styleData.login_type === 'passport'">
                <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                    <el-form-item prop="username">
                        <el-input v-model="param.username" placeholder="手机号/邮箱" size="medium">
                            <!-- <el-button slot="prepend" icon="el-icon-lx-people"></el-button> -->
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="param.password" @keyup.enter.native="login()" size="medium">
                            <!-- <el-button slot="prepend" icon="el-icon-lx-lock"></el-button> -->
                        </el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <!-- <el-button type="primary" @click="submitForm()">登录</el-button> -->
                        <el-button type="login" @click="login()" class="login-button"
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
                    <!-- <transition name="fade"> -->
                    <p class="login-tips" v-if="styleData.login_tips == '1'">
                        <span style="color: #767e89" @click="login">注册账号</span>｜<span style="color: #767e89">忘记密码？</span>
                    </p>
                </el-form>

                <div
                    :class="styleData.login_type == 'passportsso' ? 'login-style' : 'login-style1'"
                    v-if="styleData.login_type === 'passportsso'"
                >
                    <a v-for="(item, index) in loginWays" :key="item.SyName" :title="item.WayName" :href="item.WayToUrl">
                        <img class="login-poto" :src="item.WayImgUrl" style="border-radius: 50%" />
                    </a>
                </div>
            </div>

            <div class="login-other" v-if="styleData.login_type === 'sso'">
                <button class="workwechat-login" v-for="(item, index) in loginWays" :key="item.SyName">
                    <a class="workwechat" :title="item.WayName" :href="item.WayToUrl">
                        <p class="login-font">
                            <img class="workwechat-img" :src="item.WayImgUrl" alt="" />
                            {{ item.WayName | capitalize }}
                        </p>
                    </a>
                </button>
                <div v-if="styleData.login_tips == '1'">
                    <!-- <hr class="split-line" /> -->
                    <a class="register-account" href="">注册账号</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom" v-if="styleData.login_footer == 1">
            <div class="footer-bottom-center">
                <div class="move-box">
                    <div
                        class="top-area"
                        :class="styleData.qf_footer == 'footer-bottom-center-up' && allRight == false ? styleData.qf_footer : 'top-area'"
                    >
                        <div class="footer-item" v-for="(item, index) in footDatas.topArea" :key="index">
                            <a :href="item.href">
                                <img v-if="item.img" :src="item.img" alt="" width="20px" height="20px" />
                                <img onerror="this.style.display='none'" src="#" alt="" />
                                <p style="float: right; height: 20px; line-height: 20px; margin: 0px 0px 0px 5px; color: #fff">
                                    {{ item.text }}
                                </p>
                            </a>
                        </div>
                    </div>
                    <div
                        class="under-area"
                        :class="
                            styleData.qf_footer == 'footer-bottom-center-down' && allRight == false ? styleData.qf_footer : 'under-area'
                        "
                    >
                        <div class="footer-item" v-for="(item, index) in footDatas.underArea" :key="index">
                            <a :href="item.href">
                                <img v-if="item.img" :src="item.img" alt="" width="20px" height="20px" />
                                <img onerror="this.style.display='none'" src="#" alt="" />
                                <p style="float: right; height: 20px; line-height: 20px; margin: 0px 0px 0px 5px; color: #fff">
                                    {{ item.text }}
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import JSEncrypt from 'jsencrypt';

import test from '../test.vue';
export default {
    filters: {
        capitalize: function (value) {
            return value + '登录';
        }
    },
    components: {
        test
    },
    // created() {
    //     this.$refs.child.getPubKey();
    // },
    data: function () {
        return {
            styleData: {},
            logo_path: '',
            // background_path: require('../../assets/img/background.jpg'),
            footerData: [],
            open: false,
            param: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            form: {
                settingData: ''
            },
            title: '',
            pubKey: '',
            EMAIL_REGEX:
                /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            MOBILENUM_REGEX: /^\d{4,11}$/,
            changeWidth: 0,
            loginWays: [],
            footDatas: {},
            allRight: false,
            // 背景图片
            Imgs: [],
            imgObj: {}

            //logo
        };
    },
    computed: {
        aroundNum: function () {
            return Math.floor(Math.random() * this.Imgs.length);
        }
    },
    methods: {
        hiddenRight() {
            this.$refs.child.closeRight();
            // console.log('asdfa');
        },
        closeB: function (res) {
            this.changeWidth = res;
        },
        openB: function (res) {
            this.changeWidth = res;
        },
        //----------可优化
        getpubkey(res) {
            this.pubKey = res;
        },
        getNewImg(res) {
            this.imgObj = res;
        },
        getImgs(res) {
            this.Imgs = res;
        },
        getway(res) {
            this.loginWays = res;
        },
        getTopData(res) {
            this.footDatas = res;
        },
        getBlu(res) {
            this.allRight = res;
        },
        getAllData(res) {
            this.styleData = res.styleData;
            this.footerData = res.footerData;
            this.loginWays = res.loginWays;
            this.footDatas = res.footData;
        },
        getlogo(res) {
            this.logo_path = res;
        },
        //--------可优化

        login() {
            if (this.param.username == '' || this.param.password == '') {
            } else {
                var encryptor = new JSEncrypt();
                encryptor.setPublicKey(this.pubKey);
                var rsapwd = encryptor.encrypt(this.param.password);
                console.log(rsapwd);
                var info = null;
                if (this.EMAIL_REGEX.test(this.param.username)) {
                    info = {
                        email: this.param.username,
                        areaCode: '86',
                        mobile: '',
                        password: rsapwd
                    };
                } else if (this.MOBILENUM_REGEX.test(this.param.username)) {
                    info = {
                        email: '',
                        areaCode: '86',
                        mobile: this.param.username,
                        password: rsapwd
                    };
                }
                this.$axios.post('/api/user/login', JSON.stringify(info)).then((res) => {
                    if (res.data.token != undefined) {
                        var token = res.data.token;
                        document.cookie =
                            this.styleData.qflowType + 'QflowToken=' + token + ';path=/;domain=.' + this.styleData.qflowDomain;
                        window.location.href = this.styleData.homeUrl;
                    } else {
                        if (res.data.statusCode == '41110') {
                            // this.$message.error("账号或密码输入错误");
                            this.$notify.error({
                                title: '提示',
                                message: '账号或密码输入错误',
                                duration: '2000',
                                position: 'bottom-left',
                                showClose: true
                            });
                        }
                    }
                });
            }
        }
    }
};
</script>

<style scoped>
.footer-item {
    margin: 0 10px 0 10px;
}
.move-box {
    width: 100%;
    height: 100%;
}
.top-area,
.under-area {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50%;
    /* background: rgb(201, 118, 118); */
    background: rgba(18, 19, 21, 0.3);
    transition: all 1s;
}
/* .footer-bottom-center-up {
    background: #ffffff86;
    animation: changesA 3s ease-in-out infinite;
}

.footer-bottom-center-down {
    background: #ffffff86;
    animation: changesA 3s ease-in-out infinite;
}

@keyframes changesA {
    0% {
        background: rgba(18, 19, 21, 0.3);
    }
    50% {
        background: #ffffff86;
    }
    100% {
        background: rgba(18, 19, 21, 0.3);
    }
} */
.right-box {
    float: right;
}

/* ../../assets/img/login-bg.jpg */

.login-wrap {
    position: relative;
    height: 100%;
    /* background-image: url(); */
    /* background: white; */
    background: #c3c2c251;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

::v-deep .el-dialog {
    opacity: 0.8;
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
    top: 40%;
    transform: translateX(-50%);
    /* width: 350px; */
    width: 436px;
    /* height: 570px;  */
    margin: -190px 0 0 0;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.85);
    background: #fff;
    overflow: hidden;
    box-shadow: 0 0 8px #00000026;
    border-radius: 4px;
}
.login-box {
    height: 456px;
}

.ms-login_left {
    position: absolute;
    left: 30%;
    top: 40%;
    /* width: 350px; */
    width: 436px;
    /* height: 570px; 之前的并没有 */
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.85);
    background: #fff;
    overflow: hidden;
}
.ms-login_right {
    position: absolute;
    left: 70%;
    top: 40%;
    /* width: 350px; */
    width: 436px;
    /* height: 570px; 之前的并没有 */
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

/* 登录方式选择 */
.login-style {
    position: absolute;
    height: 62px;
    width: 336px;
    /* margin-top: 70px; */
    margin-left: 50px;
    bottom: 50px;
    display: flex;
    justify-content: space-around;
    transition: all 3s;
}

/* 登录方式选择 */
.login-style1 {
    display: none;
    transform: all 3s;
}

.login-style a {
    border: 1px solid #e6eaf0;
    border-radius: 100%;
}

.login-style img {
    width: 60px;
    height: 60px;
}

.footer_img {
    height: 16px;
    width: 16px;
}

.ms-content {
    padding: 30px 32px;
}

/* 该设置生效时，登录框消失 */
/* .login-box { */
/* display: none; */
/* } */

/* 只有其他登录方式时 */
.login-other {
    transition: all 1s;
    height: auto;
    overflow-y: scroll;
    text-align: center;
    /* display: none; */
}
.wechat-login {
    height: 44px;
    width: 372px;
    border: 1px solid #ccd4e0;
    background: #ffffff;
    box-sizing: border-box;
    border-radius: 4px;
    top: 168px;
    left: 32px;
    margin-top: 54px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
}
.workwechat-login {
    height: 44px;
    width: 372px;
    border: 1px solid #ccd4e0;
    background: #ffffff;
    box-sizing: border-box;
    border-radius: 4px;
    margin-top: 16px;
    display: inline-block;
    vertical-align: middle;
}

.work-login-font {
    width: max-content;
    height: auto;
    color: #121315;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    margin: 0 auto;
}

.login-font {
    width: 100%;
    height: 100%;
    color: #121315;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    /* vertical-align: middle; */
}
.wechat-img {
    width: 21px;
    height: 19px;
    vertical-align: middle;
}

.workwechat-img {
    width: 3rem;
    height: 3rem;
    vertical-align: middle;
    margin-right: 1rem;
    border-radius: 50%;
}

.split-line {
    position: absolute;
    width: 372px;
    height: 1px;
    margin-left: 32px;
    top: 336px;
    border: 0;
    background: #e6eaf0;
    transform: matrix(1, 0, 0, -1, 0, 0);
}

.register-account {
    /* position: absolute; */
    width: 56px;
    height: 22px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #767e89;
    left: calc(50% - 56px / 2 + 1px);
    top: calc(50% - 22px / 2 + 168px);
    transition: all 0.3s;
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
    height: 70px;
    bottom: 0px;
    left: 0px;
    background: rgba(18, 19, 21, 0.3);
    /* background: rgba(0, 0, 0, .15); */
    display: flex;
    justify-content: center;
    align-items: center;
}

.footer-bottom-left {
    margin-left: -66.6%;
    width: 33.3%;
    height: 102px;
    display: flex;
    justify-content: center;
}
/* edit */
.footer-bottom-center {
    margin: 0 auto;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
}
.footer-bottom-right {
    margin-left: 66.6%;
    width: 34.4%;
    height: 102px;
    display: flex;
    justify-content: center;
}
ul li {
    list-style: none;
}

.footer-column-a {
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
