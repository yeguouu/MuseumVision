<script lang='ts' setup>
import Nav from '../../components/Nav.vue';
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

// 定义人员数据结构
interface Person {
    id: string;
    name: string;
    role: string;
    createdAt: string;
}

// 新增人员方法
const newPerson = ref<Person>({
    id: '',
    name: '',
    role: '',
    createdAt: dayjs().format('YYYY-MM-DD'),
});

const roles = ['超级管理员', '区域管理员', '普通管理员'];

const addPerson = () => {
    if (!newPerson.value.name || !newPerson.value.role) {
        message.error('请填写所有字段');
        return;
    }
    newPerson.value = {
        id: '', // 重置编号为当前编号加1
        name: '',
        role: '',
        createdAt: dayjs().format('YYYY-MM-DD'), // 重置创建时间为当前时间
    };
    message.success('上传成功');
};

// 删除人员方法

// 分配角色模态框
const isModalVisible = ref(false);
const selectedPerson = ref<Person | null>(null);

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

</script>
<template>
    <div class="person-container">
        <!-- 左侧 导航栏 -->
        <Nav></Nav>
        <!-- 右侧 内容栏 -->
        <div class="content-container">
            <form @submit.prevent="addPerson">
                <div>
                    <label for="id">编号:</label>
                    <input type="text" id="id" v-model="newPerson.id" required />
                </div>
                <div>
                    <label for="name">姓名:</label>
                    <input type="text" id="name" v-model="newPerson.name" required />
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
                    <label for="createdAt">创建时间:</label>
                    <input type="text" id="createdAt" v-model="newPerson.createdAt" required readonly />
                </div>
                <button type="submit">添加</button>
            </form>
            <!-- 删除: <a-table :columns="columns" :data-source="persons" row-key="id">
                <template #action="{ record }">
                    <a-button type="link" @click="deletePerson(record.id)">删除</a-button>
                    <a-button type="link" @click="showModal(record)">分配角色</a-button>
                </template>
            </a-table> -->
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



