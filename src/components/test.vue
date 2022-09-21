<template>
    <div class="drawer">
        <div class="setting" v-if="styleData.settingHide === '1'">
            <span @click.stop="openRight()" class="iconfont icon-setting"></span>
        </div>

        <div @click.stop="setboxDemo()" :class="[styleData.settingHide === '1' ? 'setbox' : 'setbox2', { show: isshow }]">
            <div class="header">
                <p class="fl">自定义登录页配置</p>
                <p class="off" @click.stop="closeRight"><span class="iconfont icon-close"></span></p>
            </div>
            <div class="main">
                <el-alert title="您最多可以添加五个SSO登录方式" type="warning" show-icon v-if="showElAlert"></el-alert>

                <el-alert title="您上footer和下footer分别最多可添加五条记录" type="warning" show-icon v-if="showElAlert2"> </el-alert>
                <el-alert title="背景图片最多可添加五条记录" type="warning" show-icon v-if="showElAlert3"> </el-alert>
                <div class="middle">
                    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                        <el-form-item label="客户名称">
                            <el-input v-model="userData.username" size="small" style="width: 300px" type="text" :rows="5" />
                        </el-form-item>
                        <el-form-item label="QingFlow版本">
                            <el-radio-group v-model="elGroup" @change="getCheckRadio">
                                <template v-for="(item, index) in useQingFlowVersion">
                                    <el-badge value="new" class="new" v-if="item.isNew" type="success">
                                        <el-radio :label="item" border size="small">
                                            {{ item }}
                                        </el-radio>
                                    </el-badge>
                                    <el-badge value="hot" class="hot is-checked" v-else-if="item.isBase">
                                        <el-radio :label="item" border size="small">
                                            {{ item }}
                                        </el-radio>
                                    </el-badge>
                                    <el-radio :label="item" border size="small">
                                        {{ item }}
                                    </el-radio>
                                </template>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="背景图片地址" prop="background" id="imgsp">
                            <!-- -------------- -->
                            <el-tag
                                :key="index"
                                v-for="(tag, index) in dynamicTagsImg"
                                closable
                                :disable-transitions="false"
                                @close="handleCloseImg(tag)"
                            >
                                <img style="display: block" :src="tag" width="80px" alt="" />
                            </el-tag>
                            <el-input
                                class="input-new-tag"
                                v-if="inputVisibleImg"
                                v-model="inputValueImg"
                                ref="saveTagInputImg"
                                size="small"
                                @keyup.enter.native="handleInputConfirmImg"
                                @blur="handleInputConfirmImg"
                            >
                            </el-input>

                            <el-button v-else class="button-new-tag" size="small" @click="showInputImg">+ New Img</el-button>

                            <!-- ------------------- -->
                        </el-form-item>
                        <el-form-item label="登录方式" prop="loginway">
                            <el-radio v-model="styleData.login_type" label="passport">账号密码登录</el-radio>
                            <el-radio v-model="styleData.login_type" label="passportsso">账号密码&SSO登录</el-radio>
                            <el-radio v-model="styleData.login_type" label="sso">SSO登录</el-radio>
                        </el-form-item>

                        <el-form-item v-if="styleData.login_type == 'passportsso' || styleData.login_type == 'sso'">
                            <el-tag
                                :key="index"
                                v-for="(tag, index) in dynamicTags"
                                closable
                                :disable-transitions="false"
                                @close="handleCloseMY(tag, dynamicTags, loginWaysData, 'WayName')"
                                id="el-tag-img"
                            >
                                {{ tag }}
                            </el-tag>
                            <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @blur="handleInputConfirm"
                            >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ SSO登录方式</el-button>
                        </el-form-item>

                        <el-dialog title="SSO登录配置" :visible.sync="dialogFormVisible" :append-to-body="true" width="30%">
                            <el-form :model="formNewData" label-position="left" label-width="80px" :rules="rulesDialog" ref="ruleForm">
                                <el-form-item label="登录方式" required prop="WayName">
                                    <el-input v-model="formNewData.WayName" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="图片路径" required prop="WayImgUrl">
                                    <el-input v-model="formNewData.WayImgUrl" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="跳转路径" required prop="WayToUrl">
                                    <el-input v-model="formNewData.WayToUrl" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button @click="resetForm('ruleForm')" type="warning">重置</el-button>
                                    <el-button
                                        type="primary"
                                        @click="submitForm('ruleForm', loginWaysData, formNewData, 'WayName', dynamicTags)"
                                        >确 定</el-button
                                    >
                                </el-form-item>
                            </el-form>
                            <!-- <div slot="footer" class="dialog-footer"></div> -->
                        </el-dialog>

                        <el-form-item label="注册账号&找回密码" prop="logintips">
                            <el-radio v-model="styleData.login_tips" label="1">显示</el-radio>
                            <el-radio v-model="styleData.login_tips" label="2">隐藏</el-radio>
                        </el-form-item>
                        <el-form-item label="logo图片地址" prop="logo_path">
                            <el-input
                                v-model="logo_path"
                                placeholder="请输入logo图片地址"
                                size="small"
                                style="width: 300px"
                                @blur="getInputText"
                            />
                        </el-form-item>
                        <el-form-item label="logo位置" prop="logo">
                            <el-radio v-model="styleData.qf_logo" label="qf-logo_left">居左</el-radio>
                            <el-radio v-model="styleData.qf_logo" label="qf-logo_center">居中</el-radio>
                        </el-form-item>
                        <!-- add animation -->
                        <el-form-item label="登录框位置" prop="login">
                            <el-radio v-model="styleData.qf_login" label="ms-login_left">居左</el-radio>
                            <el-radio v-model="styleData.qf_login" label="ms-login">居中</el-radio>
                            <el-radio v-model="styleData.qf_login" label="ms-login_right">居右</el-radio>
                        </el-form-item>
                        <el-form-item label="footer显隐" prop="loginfooter">
                            <el-radio v-model="styleData.login_footer" label="1">显示</el-radio>
                            <el-radio v-model="styleData.login_footer" label="2">隐藏</el-radio>
                        </el-form-item>
                        <el-form-item label="footer位置" prop="footer" v-if="styleData.login_footer == 1">
                            <!-- <el-radio v-model="styleData.qf_footer" label="footer-bottom-left">居左</el-radio>
                            <el-radio v-model="styleData.qf_footer" label="footer-bottom-center">居中</el-radio>
                            <el-radio v-model="styleData.qf_footer" label="footer-bottom-right">居右</el-radio> -->
                            <el-radio v-model="styleData.qf_footer" label="footer-bottom-center-up">上</el-radio>
                            <el-radio v-model="styleData.qf_footer" label="footer-bottom-center-down">下</el-radio>

                            <el-form-item v-if="styleData.qf_footer == 'footer-bottom-center-up'">
                                <el-tag
                                    :key="index"
                                    v-for="(tag, index) in dynamicTagsUp"
                                    closable
                                    :disable-transitions="false"
                                    @close="handleCloseMY(tag, dynamicTagsUp, footDatas.topArea, 'text')"
                                >
                                    {{ tag }}
                                </el-tag>
                                <el-input
                                    class="input-new-tag"
                                    v-if="inputVisible"
                                    v-model="inputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @blur="handleInputConfirm"
                                >
                                </el-input>
                                <el-button class="button-new-tag" size="small" @click="showInputUp">+ 添加footer项(上)</el-button>
                            </el-form-item>

                            <el-form-item v-else-if="styleData.qf_footer == 'footer-bottom-center-down'">
                                <el-tag
                                    :key="index"
                                    v-for="(tag, index) in dynamicTagsDown"
                                    closable
                                    :disable-transitions="false"
                                    @close="handleCloseMY(tag, dynamicTagsDown, footDatas.underArea, 'text')"
                                >
                                    {{ tag }}
                                </el-tag>
                                <el-input
                                    class="input-new-tag"
                                    v-if="inputVisible"
                                    v-model="inputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @blur="handleInputConfirm"
                                >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInputDown">+ 添加footer项(下)</el-button>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="参数内容" prop="settingData">
                            <el-input
                                v-model="form.settingData"
                                placeholder="请输入备注名称"
                                size="small"
                                style="width: 300px"
                                type="textarea"
                                :rows="5"
                            />
                        </el-form-item>
                        <!-- 自定义对话框  footer 上 -->
                        <el-dialog title="footer(上)自定义配置" :visible.sync="dialogFormVisibleUp" :append-to-body="true" width="30%">
                            <el-form
                                :model="formNewDataFooter"
                                label-position="left"
                                label-width="80px"
                                :rules="rulesDialogFoot"
                                ref="ruleFormFootUp"
                            >
                                <el-form-item label="文本描述" required prop="text">
                                    <el-input v-model="formNewDataFooter.text" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="图片路径" prop="img">
                                    <el-input v-model="formNewDataFooter.img" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="跳转路径" required prop="href">
                                    <el-input v-model="formNewDataFooter.href" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click="dialogFormVisibleUp = false">取 消</el-button>
                                    <el-button @click="resetForm('ruleFormFootUp')" type="warning">重置</el-button>
                                    <el-button
                                        type="primary"
                                        @click="submitForm('ruleFormFootUp', footDatas.topArea, formNewDataFooter, 'text', dynamicTagsUp)"
                                        >确 定</el-button
                                    >
                                </el-form-item>
                            </el-form>
                            <!-- <div slot="footer" class="dialog-footer"></div> -->
                        </el-dialog>

                        <!-- 自定义对话框 footer 下 -->
                        <el-dialog title="footer(下)自定义配置" :visible.sync="dialogFormVisibleDown" :append-to-body="true" width="30%">
                            <el-form
                                :model="formNewDataFooter"
                                label-position="left"
                                label-width="80px"
                                :rules="rulesDialogFoot"
                                ref="ruleFormFootDown"
                            >
                                <el-form-item label="文本描述" required prop="text">
                                    <el-input v-model="formNewDataFooter.text" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="图片路径" prop="img">
                                    <el-input v-model="formNewDataFooter.img" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="跳转路径" required prop="href">
                                    <el-input v-model="formNewDataFooter.href" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click="dialogFormVisibleDown = false">取 消</el-button>
                                    <el-button @click="resetForm('ruleFormFootDown')" type="warning">重置</el-button>
                                    <el-button
                                        type="primary"
                                        @click="
                                            submitForm('ruleFormFootDown', footDatas.underArea, formNewDataFooter, 'text', dynamicTagsDown)
                                        "
                                        >确 定</el-button
                                    >
                                </el-form-item>
                            </el-form>
                            <!-- <div slot="footer" class="dialog-footer"></div> -->
                        </el-dialog>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="success" @click="saveForm">保 存</el-button>
                    <el-button type="primary" @click.stop="submitFormAll">确 定</el-button>
                    <el-button type="warning" @click="cancelFormData('form')">重 置</el-button>
                    <p class="login-tips">
                        Tips : 点击【确定】，查看页面整体效果<br />点击【保存】，在【参数内容】中获取自定义配置参数，提供给技术同事。
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../assets/icon/iconfont.css';
export default {
    name: 'demo',
    data() {
        return {
            //footerdata
            formNewData: {
                WayName: '',
                WayImgUrl: '',
                WayToUrl: ''
            },
            formNewDataFooter: {
                text: '',
                img: '',
                href: ''
            },
            //对话框
            dialogFormVisible: false,
            dialogFormVisibleUp: false,
            dialogFormVisibleDown: false,
            //---------edit
            dynamicTags: [],
            dynamicTagsUp: [],
            dynamicTagsDown: [],
            // 展示的内容
            dynamicTagsImg: [],

            inputVisibleImg: false,
            inputValueImg: '',

            inputVisible: false,
            // inputValue: '',
            //----------
            isshow: false,
            // 100%宽度
            fullWidth: 0,
            // 70%宽度
            changeWidth: 34,
            // 全部setting信息
            allData: {},
            // 保存版本号信息
            QFversionData: 4.3,
            //--------------setting--start
            userData: {},
            useQingFlowVersion: [4.1, 4.2, 4.3, 4.4, 4.5],
            // ssoHideData: {},
            styleData: {
                // qf_logo: 'qf-logo_left',
                // qf_login: 'ms-login_right',
                // qf_footer: 'footer-bottom-center',
                // background_path: '../../assets/img/login-bg.jpg',
                // login_url: 'https://accounts.qingflow.com/api/user/login'
            },
            footDatas: {},
            loginWaysData: [],
            //----------------------setting--end
            logo_path: '',
            open: false,
            param: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            rulesDialog: {
                WayName: [{ required: true, message: '请输入登录方式名称（例如：微信；企业微信）', trigger: 'blur' }],
                WayImgUrl: [
                    { required: true, message: '请输入图片的URL地址', trigger: 'blur' },
                    {
                        pattern:
                            /((http|ftp|https):\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\.\/-~-]*)?/,
                        message: '请输入正确的地址',
                        trigger: 'blur'
                    }
                ],
                WayToUrl: [
                    { required: true, message: '请输入点击图片所跳转到的地址', trigger: 'blur' },
                    {
                        pattern:
                            /((http|ftp|https):\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\.\/-~-]*)?/,
                        message: '请输入正确的地址',
                        trigger: 'blur'
                    }
                ]
            },
            rulesDialogFoot: {
                text: [{ required: true, message: '请输入相关描述', trigger: 'blur' }],
                img: [
                    { required: false, message: '请输入图片的URL地址【如果没有就留空】', trigger: 'blur' },
                    {
                        pattern:
                            /((http|ftp|https):\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\.\/-~-]*)?/,
                        message: '请输入正确的地址'
                    }
                ],
                href: [
                    { required: true, message: '请输入点击文本所跳转到的地址', trigger: 'blur' },
                    {
                        pattern:
                            /((http|ftp|https):\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\.\/-~-]*)?/,
                        message: '请输入正确的地址'
                    }
                ]
            },
            form: {
                settingData: ''
            },
            title: '',
            pubKey: '',
            EMAIL_REGEX:
                /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            MOBILENUM_REGEX: /^\d{4,11}$/,
            elGroup: 4.3,
            //显示alert
            showElAlert: false,
            showElAlert2: false,
            showElAlert3: false,
            // 是否设置完成
            allRight: false
        };
    },
    methods: {
        closeRight() {
            this.isshow = false;
            this.$emit('closeBox', this.fullWidth);
        },
        openRight() {
            this.isshow = !this.isshow;

            if (this.isshow) {
                this.$emit('openBox', this.changeWidth);
            } else {
                this.$emit('closeBox', this.fullWidth);
            }
        },
        setboxDemo() {
            this.isshow = true;
            this.$emit('openBox', this.changeWidth);
        },
        // 获取数据
        getData() {
            this.getPubKey();
            this.$axios.get('/table.json').then((res) => {
                // console.log(res);
                this.styleData = res.data.data.styleData;
                this.footerData = res.data.data.footerData;
                this.loginWaysData = res.data.data.loginWays;
                this.userData = res.data.data.userData;

                document.title = '登录｜' + this.userData.username;
                this.footDatas = res.data.data.footData;
                this.dynamicTagsImg = res.data.data.backgroundImg;
                this.logo_path = res.data.data.logo_path;
                this.allData = res.data.data;
                //全部数据
                this.rulesWayData(this.loginWaysData, this.dynamicTags, 'WayName');
                this.rulesWayData(this.footDatas.topArea, this.dynamicTagsUp, 'text');
                this.rulesWayData(this.footDatas.underArea, this.dynamicTagsDown, 'text');
                this.$emit('pullData', this.allData);
                this.$emit('sendImgs', this.dynamicTagsImg);
                this.$emit('logo', this.logo_path);
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        // 抽离方法
        // this.loginWaysData ---dataFrom
        // this.formNewData ----FormDatas
        // WayName  ---tags
        // this.dynamicTags ---diaFromDatas
        // this.dialogFormVisible ----flag-----#####
        submitForm(formName, dataFrom, FormDatas, tags, diaFromDatas) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log(this.formNewData);

                    dataFrom.push(FormDatas);
                    if (formName == 'ruleForm') {
                        this.$emit('loginwaycheck', dataFrom);
                    } else {
                        this.$emit('footArea', this.footDatas);
                    }
                    //添加展示的tag
                    diaFromDatas.push(FormDatas[tags]);

                    //判断
                    if (formName == 'ruleForm') {
                        this.dialogFormVisible = false;
                        // return false;
                    } else if (formName == 'ruleFormFootUp') {
                        this.dialogFormVisibleUp = false;
                        // return false;
                    } else if (formName == 'ruleFormFootDown') {
                        this.dialogFormVisibleDown = false;
                        // return false;
                    }
                } else {
                    return false;
                }
            });
        },
        getPubKey() {
            this.$axios.get('/api/user/pubkey').then((res) => {
                this.pubKey = res.data.pubkey;
                // 传pubkey
                this.$emit('pubkey', this.pubKey);
            });
        },
        //组织初始化数据
        //dataFrom ---this.loginWaysData
        //dataTo --- this.dynamicTags
        rulesWayData(dataFrom, dataTo, tagName) {
            dataFrom.forEach((item) => {
                dataTo.push(item[tagName]);
            });
        },
        saveForm() {
            var data = {
                data: {
                    logo_path: this.logo_path,
                    userData: {
                        username: this.userData.username,
                        useQingFlowVersion: this.userData.useQingFlowVersion
                    },
                    styleData: {
                        qf_logo: this.styleData.qf_logo,
                        qf_login: this.styleData.qf_login,
                        qf_footer: this.styleData.qf_footer,
                        login_type: this.styleData.login_type,
                        login_tips: this.styleData.login_tips,
                        login_footer: this.styleData.login_footer,
                        homeUrl: this.styleData.homeUrl,
                        // -----------
                        qflowType: this.styleData.qflowType,
                        qflowDomain: this.styleData.qflowDomain,
                        settingHide: '2'
                    },
                    backgroundImg: this.dynamicTagsImg,
                    loginWays: this.loginWaysData,
                    footData: this.footDatas
                }
                // logo_path: this.logo_path,
                // background_path: this.background_path
            };
            this.form.settingData = JSON.stringify(data);
        },
        // handleAdd() {
        //     this.open = true;
        //     this.title = '自定义登录页配置';
        // },
        cancel() {
            this.open = false;
        },
        getCheckRadio: function (value) {
            this.QFversionData = value;
        },
        //进行handleCloseMY函数的封装
        // dataFrom  -----this.dynamicTags //数据源
        // toFrom ----this.loginWaysData
        handleCloseMY(tag, dataFrom, toFrom, tagName) {
            dataFrom.splice(dataFrom.indexOf(tag), 1);
            //进行移除操作
            // this.loginWaysData.splice(this.loginWaysData.indexOf());
            let deleteIndex = 0;
            for (let index = 0; index < toFrom.length; index++) {
                const element = toFrom[index];
                if (element[tagName] == tag) {
                    deleteIndex = index;
                }
            }
            toFrom.splice(deleteIndex, 1);
        },
        showInput() {
            //改变为dialog
            if (this.loginWaysData.length >= 5) {
                this.showElAlert = true;
                setTimeout(() => {
                    this.showElAlert = false;
                }, 5000);
            } else {
                this.dialogFormVisible = true;
                // this.$refs[formName].resetFields();
                this.formNewData = {};
            }
        },
        showInputUp() {
            if (this.footDatas.topArea.length >= 5) {
                this.showElAlert2 = true;
                setTimeout(() => {
                    this.showElAlert2 = false;
                }, 5000);
            } else {
                this.dialogFormVisibleUp = true;
                // this.$refs[formName].resetFields();
                this.formNewDataFooter = {};
            }
        },
        showInputDown() {
            if (this.footDatas.underArea.length >= 5) {
                this.showElAlert2 = true;
                setTimeout(() => {
                    this.showElAlert2 = false;
                }, 5000);
            } else {
                this.dialogFormVisibleDown = true;
                // this.$refs[formName].resetFields();
                this.formNewDataFooter = {};
            }
        },
        submitFormAll() {
            this.allRight = true;
            this.$emit('allright', this.allRight);
            this.closeRight();
        },
        cancelFormData(formName) {
            this.allRight = false;
            this.$emit('allright', this.allRight);
            this.$refs[formName].resetFields();
        },

        //background img
        handleCloseImg(tag) {
            this.dynamicTagsImg.splice(this.dynamicTagsImg.indexOf(tag), 1);
        },

        showInputImg() {
            if (this.dynamicTagsImg.length >= 5) {
                this.showElAlert3 = true;
                setTimeout(() => {
                    this.showElAlert3 = false;
                }, 5000);
            } else {
                this.inputVisibleImg = true;
                this.$nextTick((_) => {
                    this.$refs.saveTagInputImg.$refs.input.focus();
                });
            }
        },

        handleInputConfirmImg() {
            let inputValueImg = this.inputValueImg;
            if (inputValueImg) {
                this.dynamicTagsImg.push(inputValueImg);
            }
            this.inputVisibleImg = false;
            let innerObj = {
                flag: this.inputVisibleImg
            };
            this.$emit('theNewImg', innerObj);
            this.inputValueImg = '';
        },
        getInputText(value) {
            console.log(value);
            // alert('dasf');
            this.$emit('logo', this.logo_path);
        }
    },

    created() {
        this.getData();
        // 将图片数据传递到父组件
    }
};
</script>
<style scoped>
::v-deep #imgsp .el-tag {
    height: max-content;
    padding: 6px 5px 0px 5px;
    margin: 5px 5px 0px 5px;
}
::v-deep #imgsp .el-tag .el-icon-close {
    top: -1px;
    right: -32px;
}
.middle {
    margin-top: 20px;
}
/* 默认单选框选中 */
::v-deep .el-dialog {
    opacity: 0.8;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}

::v-deep .el-radio {
    margin: 5px 20px 5px 00px;
}
::v-deep .el-radio.is-bordered + .el-radio.is-bordered {
    margin-left: 0px;
}
::v-deep .el-badge__content.is-fixed {
    right: 45px;
    top: 5px;
}

.el-radio-group {
    float: left;
}
.base > .el-badge__content {
    background-color: green !important
    ;
}
.drawer {
    width: max-content;
    display: flex;
    flex-direction: column;
}
.setbox {
    position: fixed;
    z-index: 1000;
    top: 0px;
    bottom: 0px;
    width: 34%;
    height: 100%;
    background: white;
    border-left: 4px solid !important;
    border-image: linear-gradient(to top, #8486f4, #9ce1f9, #f8e4aa) 1;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.12);
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease-in;
    right: -34%;
    /* 超出的部分可以出现滚动条 */
    overflow-y: scroll;
    /* padding: 0px 0px 0px 20px; */
}

.setbox2 {
    position: fixed;
    z-index: 1000;
    top: 0px;
    bottom: 0px;
    width: 34%;
    height: 100%;
    background: white;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.12);
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease-in;
    right: -34%;
    /* 超出的部分可以出现滚动条 */
    overflow-y: scroll;
    /* padding: 0px 0px 0px 20px; */
}
.show {
    right: 0;
}
.icon-setting {
    display: inline-block;
    width: max-content;
    height: max-content;
    margin: 6px 10px 0px 0px;
    font-size: 20px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}
.icon-setting:hover {
    display: inline-block;
    color: #5a9cf8;
    transform-origin: 50% 50%;
    transform: rotate(360deg);
}
.header {
    background: white;
    display: flex;
    justify-content: space-between;
}
.fl {
    padding-left: 20px;
    margin-top: 20px;
    line-height: 24px;
    font-size: 18px;
    color: #303133;
}
.icon-close {
    display: inline-block;
    margin: 6px 6px 0px 0px;
    font-size: 20px;
    border: none;
    color: rgb(210, 210, 210);
    background: white;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
}
.icon-close:hover {
    display: inline-block;
    color: #5a9cf8;
    transform-origin: 50% 50%;
    transform: rotate(360deg);
}
.main {
    /* text-align: center; */
    margin-top: 10%;
}
.dialog-footer {
    text-align: center;
    margin-bottom: 40px;
}
.login-tips {
    margin-top: 40px;
    font-weight: 600;
    line-height: 20px;
}
</style>
