<template>
    <div class="testTitle login">
        <vue-particles
                color="#dedede"
                :particleOpacity="0.7"
                :particlesNumber="80"
                shapeType="circle"
                :particleSize="4"
                linesColor="#dedede"
                :linesWidth="1"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true"
                hoverMode="grab"
                :clickEffect="true"
                clickMode="push"
        >

        </vue-particles>
        <basic-dialog
                title="注册"
                dialog-name="sqlQueryBuilder"
                height="500"
                width="600"
        >
        </basic-dialog>
        <div class="usrContainer">
            <div class="loginTitle">海洋遥感应用平台</div>
            <el-form :rules="rules" ref="ruleForm" :model="userData" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userData.password"></el-input>
                </el-form-item>
            </el-form>
            <div class="flex justContent">
                <button class="btn btnSize blue_btn"  style="margin-right: 10px;" @click="onSubmit">登录</button>
                <button class="btn btnSize blue_btn" @click="onRegister">注册</button>
            </div>
        </div>
    </div>
</template>

<script>
import BasicDialog from '../components/basic/BasicDialog';
export default {
    name: 'Login',
    components: { BasicDialog },
    data() {
        return {
            userData: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        onRegister() {
            this.$modal.show('sqlQueryBuilder');
        },
        onSubmit() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.$Auth.setSessionStorage('SESSION_REGISTER_FLAG', true);
                    this.$router.push({ path: '/overView' });
                    this.$store.commit('CHANGE_HEADER_TOP_FLAG', true);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
    #particles-js {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .testTitle {
        .fontStyle(#fff, 24px);
    }

    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        .backgroundImageByJpg('/background/ocean');

        background-size: cover;
    }

    .loginTitle {
        height: 50px;
        padding-left: 30px;
        line-height: 50px;
        color: #3e3e3e;
    }

    .usrContainer {
        .container(40vh, 40vw);

        position: relative;
        padding: 10px;
        border: 1px solid #3e3e3e;
    }

    /deep/.el-form-item__label {
        text-align: left;
        color: #fff;
    }
</style>
