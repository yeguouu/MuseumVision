<script lang='ts' setup>
import Nav from '../../components/Nav.vue';
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import router from '../../router';

// 假设从localStorage获取当前用户的账号和密码
const currentUsername = ref(localStorage.getItem('username') || '');
const currentPassword = ref(localStorage.getItem('password') || '');

const newUsername = ref(currentUsername.value);
const newPassword = ref(currentPassword.value);
const confirmPassword = ref(''); // 新增：确认密码

const updateCredentials = () => {
    if (!newUsername.value || !newPassword.value || !confirmPassword.value) {
        message.error('请填写所有字段');
        return;
    }
    if (newPassword.value !== confirmPassword.value) { // 新增：验证两次输入的密码是否一致
        message.error('两次输入的密码不一致');
        return;
    }
    // 更新localStorage中的账号和密码
    localStorage.setItem('username', newUsername.value);
    localStorage.setItem('password', newPassword.value);
    message.success('账号密码修改成功');

    // 清除登录状态
    localStorage.removeItem('authToken');
    // 重定向到登录页面
    router.push('/login');
};
</script>
<template>
    <div class="set-container">
        <!-- 左侧 导航栏 -->
        <Nav></Nav>
        <!-- 右侧 内容栏 -->
        <div class="content-container">
            <form @submit.prevent="updateCredentials">
                <div>
                    <label for="username">账号:</label>
                    <input type="text" id="username" v-model="newUsername" required />
                </div>
                <div>
                    <label for="password">密码:</label>
                    <input type="password" id="password" v-model="newPassword" required />
                </div>
                <div>
                    <label for="confirmPassword">确认密码:</label> <!-- 新增：确认密码输入框 -->
                    <input type="password" id="confirmPassword" v-model="confirmPassword" required />
                </div>
                <button type="submit">修改账号密码</button>
            </form>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.set-container {
    display: flex;
    width: 100vw;
    height: 100vh;
}

.content-container {
    width: 85%;
    height: 100%;
    background-color: #f0f0f0;
    padding: 20px;
}

form {
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    div {
        display: flex;
        flex-direction: column;

        label {
            margin-bottom: 5px;
        }

        input, textarea {
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button {
            padding: 10px;
            background-color: #1890ff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;

            &:hover {
                background-color: #40a9ff;
            }
        }
    }
}
</style>