<template>
    <a-input-search placeholder="输入搜索内容" size="large" style="width: 100%; padding: 20px;" @search="onSearch" />
    <div v-if="results.length" class="search-results">
        <div v-for="item in results" :key="item.id" class="result-item">
            <a href="#">
                <img :src="item.image" alt="result image" />
                <p>{{ item.text }}</p>
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import smartImage from '../assets/home/smart.png';

const results = ref<{ id: number; image: string; text: string }[]>([]);

const onSearch = (value: string) => {
    if (!value.trim()) {
        results.value = [];
        return;
    }
    // 模拟搜索结果,假数据
    results.value = Array.from({ length: 3 }, (_, i) => ({
        id: i,
        image: smartImage,
        text: `${value} 的搜索结果 ${i + 1}`
    }));
};
</script>

<style lang="scss" scoped>
.search-results {
    width: 100%;
    height: 50%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;

    .result-item {
        width: 300px;
        height: 400px;
        margin-left: 20px;
        text-align: center;

        img {
            width: 300px;
            height: 300px;
            object-fit: cover;
        }

        p {
            margin-top: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>