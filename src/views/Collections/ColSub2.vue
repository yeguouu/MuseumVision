<script lang='ts' setup>
import Nav from '../../components/Nav.vue';
import { ref } from 'vue';
import { message } from 'ant-design-vue';

interface Artifact {
    id: number;
    image: string;
    title: string;
    description: string;
    period: string;
    category: string;
    isTreasure: boolean;
    collectionDate: string;
    quantity: number; // 新增字段
    exhibitionArea: string; // 新增字段
}

const artifacts = ref<Artifact[]>([]);
const newArtifact = ref<Artifact>({
    id: artifacts.value.length + 1,
    image: '',
    title: '',
    description: '',
    period: '',
    category: '',
    isTreasure: false,
    collectionDate: '',
    quantity: 1, // 新增字段
    exhibitionArea: '', // 新增字段
});

const uploadArtifact = () => {
    if (!newArtifact.value.image || !newArtifact.value.title || !newArtifact.value.description || !newArtifact.value.period || !newArtifact.value.category || !newArtifact.value.collectionDate || !newArtifact.value.quantity || !newArtifact.value.exhibitionArea) {
        message.error('请填写所有字段');
        return;
    }
    console.log('上传的文物信息:', newArtifact.value); // 打印上传的信息
    artifacts.value.push({ ...newArtifact.value });
    newArtifact.value = {
        id: artifacts.value.length + 1,
        image: '', // 重置图片字段
        title: '',
        description: '',
        period: '',
        category: '',
        isTreasure: false,
        collectionDate: '',
        quantity: 1, // 新增字段
        exhibitionArea: '', // 新增字段
    };
    message.success('上传成功，请前往藏品分类页面查看');
};

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            newArtifact.value.image = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
};
</script>
<template>
    <div class="collections-container">
        <!-- 左侧 导航栏 -->
        <Nav></Nav>
        <!-- 右侧 内容栏 -->
        <div class="content-container">
            <h2>藏品录入</h2>
            <form @submit.prevent="uploadArtifact">
                <div>
                    <label for="image">上传图片:</label>
                    <input type="file" id="image" @change="handleFileChange" accept="image/*" />
                </div>
                <div>
                    <label for="title">名称:</label>
                    <input type="text" id="title" v-model="newArtifact.title" required />
                </div>
                <div>
                    <label for="description">描述:</label>
                    <textarea id="description" v-model="newArtifact.description" required></textarea>
                </div>
                <div>
                    <label for="period">时期朝代:</label>
                    <input type="text" id="period" v-model="newArtifact.period" required />
                </div>
                <div>
                    <label for="category">品类:</label>
                    <input type="text" id="category" v-model="newArtifact.category" required />
                </div>
                <div>
                    <label for="isTreasure">是否镇馆之宝:</label>
                    <input type="checkbox" id="isTreasure" v-model="newArtifact.isTreasure" />
                </div>
                <div>
                    <label for="collectionDate">收藏时间:</label>
                    <input type="date" id="collectionDate" v-model="newArtifact.collectionDate" required />
                </div>
                <div>
                    <label for="quantity">藏品数量:</label>
                    <input type="number" id="quantity" v-model="newArtifact.quantity" required min="1" /> <!-- 新增字段 -->
                </div>
                <div>
                    <label for="exhibitionArea">展览区域:</label>
                    <input type="text" id="exhibitionArea" v-model="newArtifact.exhibitionArea" required /> <!-- 新增字段 -->
                </div>
                <button type="submit">上传</button>
            </form>
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