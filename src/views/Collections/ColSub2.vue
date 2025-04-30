<script lang='ts' setup>
import Nav from '../../components/Nav.vue';
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import Header from '../../components/Header.vue';

interface Artifact {
    // id: number;
    // image: string;
    name: string;
    description: string;
    era: string;
    category: string;
    storageDate: string;
    quantity: number; // 新增字段
    exhibitionArea: string; // 新增字段
}

// const artifacts = ref<Artifact[]>([]);
const newArtifact = ref<Artifact>({
    // id: artifacts.value.length + 1,
    // image: '',
    name: '',
    description: '',
    era: '',
    category: '',
    storageDate: '',
    quantity: 1, // 新增字段
    exhibitionArea: '', // 新增字段
});

const uploadArtifact = () => {
    // !newArtifact.value.image ||
    if ( !newArtifact.value.name || !newArtifact.value.description || !newArtifact.value.era || !newArtifact.value.category || !newArtifact.value.storageDate || !newArtifact.value.quantity || !newArtifact.value.exhibitionArea) {
        message.error('请填写所有字段');
        return;
    }

    // 调用后端接口上传数据
    fetch('/api/cols', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArtifact.value),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('上传失败');
        }
        return response.json();
    })
    .then(data => {
        console.log('上传成功:', data);
        message.success('上传成功，请前往藏品分类页面查看');
        // 清空表单
        newArtifact.value = {
            // id: artifacts.value.length + 1,
            image: '',
            name: '',
            description: '',
            era: '',
            category: '',
            storageDate: '',
            quantity: 1,
            exhibitionArea: '',
        };
    })
    .catch(error => {
        console.error('上传失败:', error);
        message.error('上传失败，请稍后重试');
    });
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
    <Header></Header>
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
                    <label for="name">名称:</label>
                    <input type="text" id="name" v-model="newArtifact.name" required />
                </div>
                <div>
                    <label for="era">时期朝代:</label>
                    <select id="era" v-model="newArtifact.era" required>
                        <option value="汉">汉</option>
                        <option value="唐">唐</option>
                        <option value="宋">宋</option>
                        <option value="明">明</option>
                    </select>
                </div>
                <div>
                    <label for="category">品类:</label>
                    <select id="category" v-model="newArtifact.category" required>
                        <option value="工艺品">工艺品</option>
                        <option value="武器">武器</option>
                        <option value="陪葬品">陪葬品</option>
                        <option value="礼器">礼器</option>
                    </select>
                </div>
                <div>
                    <label for="quantity">藏品数量:</label>
                    <input type="number" id="quantity" v-model="newArtifact.quantity" required min="1" /> <!-- 新增字段 -->
                </div>
                <div>
                    <label for="storageDate">入库时间:</label>
                    <input type="date" id="storageDate" v-model="newArtifact.storageDate" required />
                </div>
                <div>
                    <label for="exhibitionArea">展览区域:</label>
                    <select id="exhibitionArea" v-model="newArtifact.exhibitionArea" required>
                        <option value="展区一">展区一</option>
                        <option value="展区二">展区二</option>
                    </select>
                </div>
                <div>
                    <label for="description">描述:</label>
                    <textarea id="description" v-model="newArtifact.description" required></textarea>
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

        input, textarea, select {
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