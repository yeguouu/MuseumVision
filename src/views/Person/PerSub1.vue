<script lang='ts' setup>
import Nav from '../../components/Nav.vue';
import { ref } from 'vue';
import { message } from 'ant-design-vue';

// 定义人员数据结构
interface Person {
    id: number;
    name: string;
    role: string;
    createdAt: string;
}

// 假数据
const persons = ref<Person[]>([
    { id: 1, name: '张三', role: '超级管理员', createdAt: '2023-01-01' },
    { id: 2, name: '李四', role: '区域管理员', createdAt: '2023-02-01' },
    { id: 3, name: '王五', role: '普通管理员', createdAt: '2023-03-01' },
    { id: 4, name: '赵六', role: '超级管理员', createdAt: '2023-04-01' },
    { id: 5, name: '孙七', role: '区域管理员', createdAt: '2023-05-01' },
    { id: 6, name: '周八', role: '普通管理员', createdAt: '2023-06-01' },
]);

// 删除人员方法
const deletePerson = (id: number) => {
    persons.value = persons.value.filter(person => person.id !== id);
    message.success('删除成功');
};

// 分配角色模态框
const isModalVisible = ref(false);
const selectedPerson = ref<Person | null>(null);
const roles = ['超级管理员', '区域管理员', '普通管理员'];

const showModal = (person: Person) => {
    selectedPerson.value = person;
    isModalVisible.value = true;
};

const handleOk = () => {
    if (selectedPerson.value) {
        message.success('角色分配成功');
    }
    isModalVisible.value = false;
};

const assignRole = (role: string) => {
    if (selectedPerson.value) {
        selectedPerson.value.role = role;
        handleOk();
    }
};

// 定义表格列
const columns = [
    { title: '编号', dataIndex: 'id', key: 'id' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '角色', dataIndex: 'role', key: 'role' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '操作', key: 'action', slots: { customRender: 'action' } },
];
</script>
<template>
    <div class="person-container">
        <!-- 左侧 导航栏 -->
        <Nav></Nav>
        <!-- 右侧 内容栏 -->
        <div class="content-container">
            <a-table :columns="columns" :data-source="persons" row-key="id">
                <template #action="{ record }">
                    <a-button type="link" @click="deletePerson(record.id)">删除</a-button>
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