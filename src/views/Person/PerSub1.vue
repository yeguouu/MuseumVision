<script lang='ts' setup>
import Nav from '../../components/Nav.vue';
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import Header from '../../components/Header.vue';

// 定义人员数据结构
interface Person {
    _id: number;
    username: string;
    role: string;
    createdAt: string;
}

// 从后端接口获取人员数据
const persons = ref<Person[]>([]);

onMounted(() => {
    fetch('/api/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        })
        .then(data => {
            // 按照返回顺序排列编号
            persons.value = data.map((person, index) => ({
                ...person,
                id: index + 1
            }));
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            message.error('获取人员数据失败');
        });
});

// 分配角色模态框
const isModalVisible = ref(false);
const selectedPerson = ref<Person | null>(null);
const roles = ['超级管理员', '研究人员', '普通管理员'];

const showModal = (person: Person) => {
    selectedPerson.value = person;
    isModalVisible.value = true;
};

const handleOk = () => {
    if (selectedPerson.value) {
        // 新增：调用后端接口更新用户角色
        fetch('/api/users/role', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: selectedPerson.value._id,
                role: selectedPerson.value.role,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update user role');
            }
            return response.json();
        })
        .then(data => {
            console.log('Role updated successfully:', data);
            message.success('角色分配成功');
        })
        .catch(error => {
            console.error('Error updating user role:', error);
            message.error('角色分配失败，请稍后重试');
        });
    }
    isModalVisible.value = false;
};

// 定义表格列
const columns = [
    { 
        title: '编号', 
        key: 'index',
        customRender: ({ index }) => index + 1 
    },
    { title: '账号', dataIndex: 'username', key: 'username' },
    { title: '角色', dataIndex: 'role', key: 'role' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { 
        title: '操作', 
        key: 'action', 
        slots: { customRender: 'action' } 
    },
];
</script>
<template>
    <Header></Header>
    <div class="person-container">
        <!-- 左侧 导航栏 -->
        <Nav></Nav>
        <!-- 右侧 内容栏 -->
        <div class="content-container">
            <a-table :columns="columns" :data-source="persons" row-key="id">
                <template #action="{ record }">
                    <a-button type="link" @click="showModal(record)">分配角色</a-button>
                </template>
            </a-table>
            <a-modal v-model:visible="isModalVisible" title="分配角色" @ok="handleOk">
                <a-select v-model:value="selectedPerson.role" style="width: 100%">
                    <a-select-option v-for="role in roles" :key="role" :value="role">
                        {{ role }}
                    </a-select-option>
                </a-select>
            </a-modal>
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
</style>