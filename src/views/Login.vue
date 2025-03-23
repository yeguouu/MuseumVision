<template>
    <div class="login_container">
        <a-form :model="formState" class="form">
            <div class="title">欢迎登录</div>
            <a-form-item label="账号" name="username">
                <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="密码" name="password">
                <a-input-password v-model:value="formState.password" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click="handleLogin">登录</a-button>
            </a-form-item>
            <div class="forget" @click="showModal">忘记密码？</div>
        </a-form>
        <a-modal v-model:visible="isModalVisible" title="忘记密码" @ok="handleOk">
            <p>请联系管理员</p>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue';
import { message } from 'ant-design-vue';
import router from '../router';

const formState = reactive({
    username: '',
    password: '',
});


const isModalVisible = ref(false);

const showModal = () => {
    isModalVisible.value = true;
};

const handleOk = () => {
    isModalVisible.value = false;
}
const handleLogin = () => {
    if (formState.username === 'admin' && formState.password === '88421cgp') {
        message.success('登录成功');
        // 登录成功后的逻辑，跳转到首页
        // 存入localStorage
        localStorage.setItem('authToken','true');    
        router.push('/');
    } else {
        message.error('用户名或密码错误');
    }
};
</script>

<style lang="scss" scoped>
.login_container {
    width: 100vw;
    height: 100vh;
    background-image: url('../assets/login/bg.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.form {
    width: 350px;
    height: 450px;
    top: 200px;
    right: 200px;
    position: absolute;
    z-index: 200;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;

    .title {
        font-weight: 500;
        font-size: 30px;
        margin-bottom: 40px;
    }

    .ant-form-item {
        width: 100%;
        margin-bottom: 40px;

        .ant-btn-primary {
            width: 100%;
        }
    }

    .forget {
        position: absolute;
        left: 30px;
        bottom: 80px;
        color: gray;
        cursor: pointer;
    }
}
</style>