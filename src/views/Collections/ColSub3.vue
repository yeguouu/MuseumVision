<script lang='ts' setup>
import Nav from '../../components/Nav.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Col1 from '../../assets/col/col1.png';
import Header from '../../components/Header.vue';

interface Artifact {
    id: number;
    image: string;
    title: string;
    description: string;
    era: string;
    category: string;
}

const router = useRouter();
const artifacts = ref<Artifact[]>([]);
const eraCategories = ref<{ [key: string]: Artifact[] }>({});
const categoryCategories = ref<{ [key: string]: Artifact[] }>({});
const isModalVisible = ref(false);
const selectedArtifact = ref<Artifact | null>(null);
const expandedRows = ref<boolean[]>([false, false, false]);
const showArtifacts = ref(false); // 新增：控制是否显示文物信息

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
            image: Col1, // 统一使用前端图片
        }));
        categorizeArtifacts();
    })
    .catch(error => console.error('problem', error));
});

const categorizeArtifacts = () => {
    eraCategories.value = {
        '汉代': artifacts.value.filter(artifact => artifact.era === '汉代'),
        '唐代': artifacts.value.filter(artifact => artifact.era === '唐代'),
        '宋代': artifacts.value.filter(artifact => artifact.era === '宋代'),
        '明代': artifacts.value.filter(artifact => artifact.era === '明代'),
    };
    categoryCategories.value = {
        '工艺品': artifacts.value.filter(artifact => artifact.category === '工艺品'),
        '陪葬品': artifacts.value.filter(artifact => artifact.category === '陪葬品'),
        '武器': artifacts.value.filter(artifact => artifact.category === '武器'),
        '礼器': artifacts.value.filter(artifact => artifact.category === '礼器'),
    };
};

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

// 修改: 确保在点击功能分类时导航到正确的路由
const navigateToCategory = (category: string) => {
    router.push({ name: 'categoryArtifacts', params: { category } });
};

// 新增: 导航到年代分类的路由
const navigateToEra = (era: string) => {
    router.push({ name: 'eraArtifacts', params: { era } });
};

const showArtifactsForCategory = () => {
    showArtifacts.value = true; // 新增：显示文物信息
};
</script>
<template>
    <Header></Header>
    <div class="collections-container">
        <!-- 左侧 导航栏 -->
        <Nav></Nav>
        <!-- 右侧 内容栏 -->
        <div class="content-container">
            <div class="section">
                <h2>年代分类</h2>
                <div class="items">
                    <div class="item-box" v-for="(era, index) in Object.keys(eraCategories)" :key="index" @click="navigateToEra(era)">
                        <p>{{ era }}</p>
                    </div>
                </div>
            </div>
            <div class="section">
                <h2>功能分类</h2>
                <div class="items">
                    <div class="item-box" v-for="(category, index) in Object.keys(categoryCategories)" :key="index" @click="navigateToCategory(category)">
                        <p>{{ category }}</p>
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
        gap: 20px;

        .item-box {
            width: 250px;
            height: 250px;
            cursor: pointer;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ffffff;
            border: 1px solid #ccc;
            border-radius: 5px;
            transition: box-shadow 0.3s ease;

            p {
                text-align: center;
                margin: 0;
            }

            &:hover {
                box-shadow: 4px 4px 4px 4px #888888;
            }
        }

        .more {
            width: 150px;
            height: 150px;
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