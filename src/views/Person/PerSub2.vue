<script lang='ts' setup>
import Nav from '../../components/Nav.vue';
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import Header from '../../components/Header.vue';

// 定义人员数据结构
interface Person {
    id: string;
    username: string;
    role: string;
    password: string;
    confirmPassword: string;
    createdAt: string;
}

// 新增人员方法
const newPerson = ref<Person>({
    id: '',
    username: '',
    role: '',
    password: '',
    confirmPassword: '',
    createdAt: dayjs().format('YYYY-MM-DD'),
});

const roles = ['超级管理员', '区域管理员', '普通管理员'];

const addPerson = () => {
    if (!newPerson.value.username || !newPerson.value.role || !newPerson.value.password || !newPerson.value.confirmPassword) {
        message.error('请填写所有字段');
        return;
    }
    if (newPerson.value.password !== newPerson.value.confirmPassword) {
        message.error('两次输入的密码不一致');
        return;
    }

    // 调用后端接口添加用户
    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: newPerson.value.username,
            role: newPerson.value.role,
            password: newPerson.value.password,
            createdAt: newPerson.value.createdAt,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('添加失败');
        }
        return response.json();
    })
    .then(data => {
        console.log('添加成功:', data);
        message.success('添加成功');
        // 重置表单
        newPerson.value = {
            id: '',
            username: '',
            role: '',
            password: '',
            confirmPassword: '',
            createdAt: dayjs().format('YYYY-MM-DD'),
        };
    })
    .catch(error => {
        console.error('添加失败:', error);
        message.error('添加失败，请稍后重试');
    });
};

// 分配角色模态框
const isModalVisible = ref(false);
const selectedPerson = ref<Person | null>(null);
const handleOk = () => {
    if (selectedPerson.value) {
        message.success('角色分配成功');
    }
    isModalVisible.value = false;
};

</script>
<template>
    <Header></Header>
    <div class="person-container">
        <!-- 左侧 导航栏 -->
        <Nav></Nav>
        <!-- 右侧 内容栏 -->
        <div class="content-container">
            <form @submit.prevent="addPerson">
                <div>
                    <label for="username">账号:</label>
                    <input type="text" id="username" v-model="newPerson.username" required />
                </div>
                <div>
                    <label for="role">角色:</label>
                    <a-select v-model:value="newPerson.role" style="width: 100%">
                        <a-select-option v-for="role in roles" :key="role" :value="role">
                            {{ role }}
                        </a-select-option>
                    </a-select>
                </div>
                <div>
                    <label for="password">密码:</label>
                    <input type="password" id="password" v-model="newPerson.password" required />
                </div>
                <div>
                    <label for="confirmPassword">重复密码:</label>
                    <input type="password" id="confirmPassword" v-model="newPerson.confirmPassword" required />
                </div>
                <div>
                    <label for="createdAt">创建时间:</label>
                    <input type="text" id="createdAt" v-model="newPerson.createdAt" required readonly />
                </div>
                <button type="submit">添加</button>
            </form>
            
        </div>
    </div>
</template>
<style lang='scss' scoped>
.person-container {
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

.ant-table {
    margin-top: 20px;
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