<template>
    <div>
        <el-dialog :title="diaTitle" :visible.sync="dialogFormVisible" :append-to-body="true" width="30%">
            <el-form :model="formNewFootData" label-position="left" label-width="80px" :rules="rulesFootDialog" ref="ruleForm">
                <!-- <el-form-item label="登录方式" required prop="WayName">
                    <el-input v-model="formNewData.WayName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片路径" required prop="WayImgUrl">
                    <el-input v-model="formNewData.WayImgUrl" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="跳转路径" required prop="WayToUrl">
                    <el-input v-model="formNewData.WayToUrl" autocomplete="off"></el-input>
                </el-form-item>
                 -->
                <el-form-item v-for=""> </el-form-item>
                <el-form-item>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button @click="resetForm('ruleForm')" type="warning">重置</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </el-form-item>
            </el-form>
            <!-- <div slot="footer" class="dialog-footer"></div> -->
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        aboutData
    },
    components: {},
    data() {
        return {};
    },
    computed: {},
    methods: {},
    created() {},
    mounted() {}
};
</script>

<style lang="scss" scoped></style>
