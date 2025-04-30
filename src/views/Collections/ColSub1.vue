<script lang='ts' setup>
import Nav from '../../components/Nav.vue';
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import Header from '../../components/Header.vue';

interface Artifact {
    id: number;
    name: string;
    era: string;
    category: string;
    quantity: number;
    storageDate: string;
    exhibitionArea: string;
    description: string;
}

const artifacts = ref<Artifact[]>([]);
const isModalVisible = ref(false);
const selectedArtifact = ref<Artifact | null>(null);
const borrowInfo = ref({
    destinationType: '',
    destinationName: '',
    reason: '',
    borrowDate: '',
    duration: '',
});

onMounted(() => {
    fetch('/api/cols', {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        artifacts.value = data.map((item: any) => ({
            ...item,
            exhibitionArea: item.exhibitionArea || '未出借',
        }));
    })
    .catch(error => console.error('problem', error));
});

const handleBorrow = (artifact: Artifact) => {
    selectedArtifact.value = artifact;
    isModalVisible.value = true;
};

const confirmBorrow = () => {
    if (!borrowInfo.value.destinationType || !borrowInfo.value.destinationName || !borrowInfo.value.reason || !borrowInfo.value.borrowDate || !borrowInfo.value.duration ) {
        message.error('请填写所有出借信息');
        return;
    }

    // 更新文物的展览区域为“出借中”
    if (selectedArtifact.value) {
        selectedArtifact.value.exhibitionArea = '出借中';
        message.success('出借成功，展览区域已更新为“出借中”');
        isModalVisible.value = false;
    }
};

const closeModal = () => {
    isModalVisible.value = false;
    borrowInfo.value = {
        destinationType: '',
        destinationName:'',
        reason: '',
        borrowDate: '',
        duration: '',
    };
};
</script>

<template>
    <Header></Header>
    <div class="collections-container">
        <!-- 左侧 导航栏 -->
        <Nav></Nav>
        <!-- 右侧 内容栏 -->
        <div class="content-container">
            <h2>藏品借出</h2>
            <table class="artifact-table">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>时期朝代</th>
                        <th>品类</th>
                        <th>数量</th>
                        <th>入库时间</th>
                        <th>展览区域</th>
                        <th>描述</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="artifact in artifacts" :key="artifact.id">
                        <td>{{ artifact.name }}</td>
                        <td>{{ artifact.era }}</td>
                        <td>{{ artifact.category }}</td>
                        <td>{{ artifact.quantity }}</td>
                        <td>{{ artifact.storageDate }}</td>
                        <td>{{ artifact.exhibitionArea }}</td>
                        <td>{{ artifact.description }}</td>
                        <td>
                            <button @click="handleBorrow(artifact)">出借</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <a-modal v-model:visible="isModalVisible" title="出借信息" @cancel="closeModal">
                <div class="form-container">
                    <div class="form-item">
                        <label for="destinationType">出借去向:</label>
                        <select id="destinationType" v-model="borrowInfo.destinationType" required>
                            <option value="">请选择</option>
                            <option value="otherMuseum">其他博物馆</option>
                            <option value="researcher">研究人员</option>
                        </select>
                        <input v-if="borrowInfo.destinationType" type="text" id="destinationName" v-model="borrowInfo.destinationName" placeholder="请输入名称" required />
                    </div>
                    <div class="form-item">
                        <label for="reason">出借缘由:</label>
                        <select id="reason" v-model="borrowInfo.reason" required>
                            <option value="">请选择</option>
                            <option value="outgoingExhibition">外出展览</option>
                            <option value="archaeologicalResearch">考古研究</option>
                        </select>
                    </div>
                    <div class="form-item">
                        <label for="borrowDate">出借时间:</label>
                        <input type="date" id="borrowDate" v-model="borrowInfo.borrowDate" required />
                    </div>
                    <div class="form-item">
                        <label for="duration">出借时长:</label>
                        <select id="duration" v-model="borrowInfo.duration" required>
                            <option value="">请选择</option>
                            <option value="1Week">1周内</option>
                            <option value="1Month">1月内</option>
                            <option value="2Months">2月内</option>
                            <option value="3Months">3月内</option>
                            <option value="6Months">半年内</option>
                            <option value="1Year">一年内</option>
                            <option value="permanent">永久借出</option>
                        </select>
                    </div>
                </div>
                <template #footer>
                    <button @click="confirmBorrow">确认出借</button>
                </template>
            </a-modal>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.collections-container {
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

.artifact-table {
    width: 100%;
    border-collapse: collapse;

    th, td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f0f0f0;
    }

    button {
        padding: 5px 10px;
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

a-modal {
    padding: 20px;

    .form-container {
        display: flex;
        flex-direction: column;
        gap: 15px;

        .form-item {
            display: flex;
            align-items: center;
            gap: 10px;

            label {
                width: 100px;
                text-align: right;
            }

            input {
                flex-grow: 1;
                padding: 5px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
        }
    }
}
</style>