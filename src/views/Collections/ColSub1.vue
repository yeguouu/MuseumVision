<script lang='ts' setup>
import Nav from '../../components/Nav.vue';
import { ref } from 'vue';
import Col1 from '../../assets/col/col1.png'

interface Artifact {
    id: number;
    image: string;
    title: string;
    description: string;
}

const artifacts: Artifact[] = [
    { id: 1, image: Col1, title: '文物1', description: '这是文物1的描述' },
    { id: 2, image: Col1, title: '文物2', description: '这是文物2的描述' },
    { id: 3, image: Col1, title: '文物3', description: '这是文物3的描述' },
    { id: 4, image: Col1, title: '文物4', description: '这是文物4的描述' },
    { id: 5, image: Col1, title: '文物5', description: '这是文物5的描述' },
    { id: 6, image: Col1, title: '文物6', description: '这是文物6的描述' },
    { id: 7, image: Col1, title: '文物7', description: '这是文物7的描述' },
    { id: 8, image: Col1, title: '文物8', description: '这是文物8的描述' },
    { id: 9, image: Col1, title: '文物9', description: '这是文物9的描述' },
    { id: 10, image: Col1, title: '文物10', description: '这是文物10的描述' },
    { id: 11, image: Col1, title: '文物11', description: '这是文物11的描述' },
    { id: 12, image: Col1, title: '文物12', description: '这是文物12的描述' },
    { id: 13, image: Col1, title: '文物13', description: '这是文物13的描述' },
    { id: 14, image: Col1, title: '文物14', description: '这是文物14的描述' },
    { id: 15, image: Col1, title: '文物15', description: '这是文物15的描述' },
    { id: 16, image: Col1, title: '文物16', description: '这是文物16的描述' },
    { id: 17, image: Col1, title: '文物17', description: '这是文物17的描述' },
    { id: 18, image: Col1, title: '文物18', description: '这是文物18的描述' },
];

const isModalVisible = ref(false);
const selectedArtifact = ref<Artifact | null>(null);
const expandedRows = ref<boolean[]>([false, false, false]);

const showModal = (artifact: Artifact) => {
    selectedArtifact.value = artifact;
    isModalVisible.value = true;
};

const handleOk = () => {
    isModalVisible.value = false;
};

const toggleRow = (index: number) => {
    expandedRows.value[index] = !expandedRows.value[index];
};
</script>
<template>
    <div class="collections-container">
        <!-- 左侧 导航栏 -->
        <Nav></Nav>
        <!-- 右侧 内容栏 -->
        <div class="content-container">
            <div class="section">
                <h2>镇馆之宝</h2>
                <div class="items">
                    <div v-for="(artifact, index) in artifacts.slice(0, expandedRows[0] ? 6 : 3)" :key="artifact.id" class="item" @click="showModal(artifact)">
                        <img :src="artifact.image" alt="artifact image" />
                        <p>{{ artifact.title }}</p>
                    </div>
                    <div v-if="!expandedRows[0]" class="item more" @click="toggleRow(0)">
                        <p>显示更多</p>
                    </div>
                </div>
            </div>
            <div class="section">
                <h2>年代分类</h2>
                <div class="items">
                    <div v-for="(artifact, index) in artifacts.slice(6, expandedRows[1] ? 12 : 9)" :key="artifact.id" class="item" @click="showModal(artifact)">
                        <img :src="artifact.image" alt="artifact image" />
                        <p>{{ artifact.title }}</p>
                    </div>
                    <div v-if="!expandedRows[1]" class="item more" @click="toggleRow(1)">
                        <p>显示更多</p>
                    </div>
                </div>
            </div>
            <div class="section">
                <h2>功能分类</h2>
                <div class="items">
                    <div v-for="(artifact, index) in artifacts.slice(12, expandedRows[2] ? 18 : 15)" :key="artifact.id" class="item" @click="showModal(artifact)">
                        <img :src="artifact.image" alt="artifact image" />
                        <p>{{ artifact.title }}</p>
                    </div>
                    <div v-if="!expandedRows[2]" class="item more" @click="toggleRow(2)">
                        <p>显示更多</p>
                    </div>
                </div>
            </div>
            <a-modal v-model:visible="isModalVisible" title="文物信息" :footer="null">
                <div v-if="selectedArtifact">
                    <img :src="selectedArtifact.image" alt="artifact image" />
                    <p>{{ selectedArtifact.description }}</p>
                </div>
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

.section {
    margin-bottom: 20px;

    h2 {
        margin-bottom: 10px;
    }

    .items {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 10px;

        .item {
            width: 300px;
            height: 300px;
            cursor: pointer;
            margin-bottom: 20px;

            img {
                width: 100%;
                height: auto;
                transition: box-shadow 0.3s ease;
            }

            p {
                text-align: center;
            }

            &:hover {
                img {
                    box-shadow: 4px 4px 4px 4px #888888;
                }
            }
        }

        .more {
            width: 300px;
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background-color: #e0e0e0;
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 5px;
        }
    }
}
.ant-modal-body img {
    width: 460px; // 固定宽度
    height: 460px; // 固定高度
    object-fit: cover; // 保持图片比例并裁剪
}
</style>