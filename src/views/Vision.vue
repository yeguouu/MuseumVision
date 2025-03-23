<script lang='ts' setup>
import Nav from '../components/Nav.vue';
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

// 假设从某个API获取文物数据
const artifacts = ref([
    { id: 1, image: '', title: '文物1', description: '这是文物1的描述', period: '2020', category: '绘画', status: '展出中', exhibitionArea: '展厅1' },
    { id: 2, image: '', title: '文物2', description: '这是文物2的描述', period: '2010', category: '雕塑', status: '维护中', exhibitionArea: '展厅2' },
    { id: 3, image: '', title: '文物3', description: '这是文物3的描述', period: '2020', category: '文物', status: '存储中', exhibitionArea: '展厅1' },
    { id: 4, image: '', title: '文物4', description: '这是文物4的描述', period: '2015', category: '绘画', status: '展出中', exhibitionArea: '展厅3' },
    { id: 5, image: '', title: '文物5', description: '这是文物5的描述', period: '2010', category: '雕塑', status: '维护中', exhibitionArea: '展厅2' },
    { id: 6, image: '', title: '文物6', description: '这是文物6的描述', period: '2020', category: '文物', status: '存储中', exhibitionArea: '展厅1' },
]);

// 计算文物总数
const totalArtifacts = artifacts.value.length;

// 计算年代分类统计
const periodData = artifacts.value.reduce((acc, artifact) => {
    if (!acc[artifact.period]) acc[artifact.period] = 0;
    acc[artifact.period]++;
    return acc;
}, {});

// 计算展区分布
const exhibitionAreaData = artifacts.value.reduce((acc, artifact) => {
    if (!acc[artifact.exhibitionArea]) acc[artifact.exhibitionArea] = 0;
    acc[artifact.exhibitionArea]++;
    return acc;
}, {});

// 计算品类分类统计
const categoryData = artifacts.value.reduce((acc, artifact) => {
    if (!acc[artifact.category]) acc[artifact.category] = 0;
    acc[artifact.category]++;
    return acc;
}, {});

// 计算藏品状态
const statusData = artifacts.value.reduce((acc, artifact) => {
    if (!acc[artifact.status]) acc[artifact.status] = 0;
    acc[artifact.status]++;
    return acc;
}, {});

// 定义饼图数据
const chartData = [
    {
        title: '年代分类统计',
        data: Object.entries(periodData).map(([name, value]) => ({ value, name }))
    },
    {
        title: '展区分布',
        data: Object.entries(exhibitionAreaData).map(([name, value]) => ({ value, name }))
    },
    {
        title: '品类分类统计',
        data: Object.entries(categoryData).map(([name, value]) => ({ value, name }))
    },
    {
        title: '藏品状态',
        data: Object.entries(statusData).map(([name, value]) => ({ value, name }))
    }
];

// 初始化图表
const initChart = (containerId: string, data: { value: number, name: string }[]) => {
    const chartDom = document.getElementById(containerId) as HTMLElement;
    const myChart = echarts.init(chartDom);
    const option = {
        title: {
            text: containerId,
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
};

// 在组件挂载后初始化图表
onMounted(() => {
    chartData.forEach((chart, index) => {
        initChart(`chart${index + 1}`, chart.data);
    });
});
</script>
<template>
    <div class="vision-container">
        <!-- 左侧 导航栏 -->
        <Nav></Nav>
        <!-- 右侧 内容栏 -->
        <div class="content-container">
            <div class="total-artifacts">藏品总数: {{ totalArtifacts }}</div>
            <div id="chart1" style="width: 400px; height: 400px;"></div>
            <div id="chart2" style="width: 400px; height: 400px;"></div>
            <div id="chart3" style="width: 400px; height: 400px;"></div>
            <div id="chart4" style="width: 400px; height: 400px;"></div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.vision-container {
    display: flex;
    width: 100vw;
    height: 100vh;
}

.content-container {
    width: 85%;
    height: 100%;
    background-color: #f0f0f0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}

.total-artifacts {
    font-size: 24px;
    margin-bottom: 20px;
}
</style>