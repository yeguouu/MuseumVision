<script lang='ts' setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const router = useRouter();
const route = useRoute();

const navigateTo = (path: string) => {
    router.push(path);
};

const items = [
    {
        key: '1',
        label: '首页',
        onClick: () => navigateTo('/'),
    },
    {
        key: '2',
        label: '藏品管理',
        children: [
            {
                key: '2-1',
                label: '子导航1',
                onClick: () => navigateTo('/collections/sub1'),
            },
            {
                key: '2-2',
                label: '子导航2',
                onClick: () => navigateTo('/collections/sub2'),
            },
        ],
    },
    {
        key: '3',
        label: '人员管理',
        children: [
            {
                key: '3-1',
                label: '子导航1',
                onClick: () => navigateTo('/person/sub1'),
            },
            {
                key: '3-2',
                label: '子导航2',
                onClick: () => navigateTo('/person/sub2'),
            },
        ],
    },
    {
        key: '4',
        label: '设置',
        children: [
            {
                key: '4-1',
                label: '子导航1',
                onClick: () => navigateTo('/set/sub1'),
            },
            {
                key: '4-2',
                label: '子导航2',
                onClick: () => navigateTo('/set/sub2'),
            },
        ],
    },
    {
        key: '5',
        label: '数据大屏',
        onClick: () => navigateTo('/vision'),
    },
];

const openKeys = ref<string[]>([]);

// 展开状态
watch(
    () => route.path,
    (newPath) => {
        if (newPath.startsWith('/collections')) {
            openKeys.value = ['2'];
        } else if (newPath.startsWith('/person')) {
            openKeys.value = ['3'];
        } else if (newPath.startsWith('/set')) {
            openKeys.value = ['4'];
        } else {
            openKeys.value = [];
        }
    },
    { immediate: true }
);
</script>
<template>
    <a-menu mode="inline" :items="items" class="sidebar" v-model:openKeys="openKeys" />
</template>
<style lang='scss' scoped>
.sidebar {
    width: 15%;
}
</style>