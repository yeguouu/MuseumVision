<script lang='ts' setup>
import Nav from '../../components/Nav.vue';
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import Header from '../../components/Header.vue';
import Col1 from '../../assets/col/col1.png'; // 引入统一的图片

// 新增：定义文物数据结构
interface Artifact {
    id: number;
    name: string;
    image: string;
    era: string;
    category: string;
    quantity: number;
    storageDate: string;
    exhibitionArea: string;
    description: string;
}

// 新增：当前选中的文物
const selectedArtifact = ref<Artifact | null>(null);
const artifacts = ref<Artifact[]>([]);

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
            // 过滤出展区一的文物
            const filteredArtifacts = data.filter((artifact: Artifact) => artifact.exhibitionArea === '展区二');
            // 为每个文物添加统一的图片
            artifacts.value = filteredArtifacts.map((item: any) => ({
                ...item,
                image: Col1,
            }));
        })
        .catch(error => console.error('problem', error));
});

// 新增：显示详细信息的模态框
const isModalVisible = ref(false);
const showModal = (artifact: Artifact) => {
    selectedArtifact.value = artifact;
    isModalVisible.value = true;
};
</script>
<template>
    <Header></Header>
    <div class="set-container">
        <!-- 左侧 导航栏 -->
        <Nav></Nav>
        <!-- 右侧 内容栏 -->
        <div class="content-container">
            <h2>展区二的文物</h2>
            <div class="artifacts-grid">
                <div v-for="artifact in artifacts" :key="artifact.id" class="artifact-item"
                    @click="showModal(artifact)">
                    <img :src="artifact.image" alt="artifact image" />
                    <p>{{ artifact.name }}</p>
                </div>
            </div>
            <a-modal v-model:visible="isModalVisible" title="文物信息" :footer="null" @cancel="isModalVisible = false">
                <div v-if="selectedArtifact">
                    <img :src="selectedArtifact.image" alt="artifact image" />
                    <p><strong>名称：</strong>{{ selectedArtifact.name }}</p>
                    <p><strong>朝代：</strong>{{ selectedArtifact.era }}</p>
                    <p><strong>品类：</strong>{{ selectedArtifact.category }}</p>
                    <p><strong>数量：</strong>{{ selectedArtifact.quantity }}</p>
                    <p><strong>入库时间：</strong>{{ selectedArtifact.storageDate }}</p>
                    <p><strong>描述：</strong>{{ selectedArtifact.description }}</p>
                </div>
            </a-modal>
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
    display: flex;
    flex-direction: column;
}

.artifacts-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-top: 20px;
}

.artifact-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease;

    img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    p {
        margin-top: 10px;
        font-weight: bold;
        text-align: center;
    }

    &:hover {
        transform: translateY(-5px);
    }
}

.ant-modal-body img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    margin-bottom: 15px;
}
</style>