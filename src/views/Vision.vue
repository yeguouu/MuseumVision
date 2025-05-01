<template>
    <Header></Header>
    <div class="vision-container">
        <!-- 左侧 导航栏 -->
        <Nav></Nav>
        <!-- 右侧 内容栏 -->
        <div class="content-container">
            <div class="chart-container">
                <!-- 数据总览图 -->
                <div class="chart-item overview-chart" ref="overviewChart"></div>
                <!-- 关键词条云图 -->
                <div class="chart-item word-cloud-chart" ref="wordCloudChart"></div>
                <!-- 横向柱状图：文物各年代分类 -->
                <div class="chart-item era-bar-chart" ref="eraBarChart"></div>
                <!-- 竖向柱状图：文物品类分布 -->
                <div class="chart-item category-bar-chart" ref="categoryBarChart"></div>
                <!-- 新增：折线图：每年入库文物数量 -->
                <div class="chart-item year-line-chart" ref="yearLineChart"></div>
                <!-- 新增：饼图：管理人员占比 -->
                <div class="chart-item manager-pie-chart" ref="managerPieChart"></div>
            </div>
            <div class="bg">
                <img :src="Bg" alt="">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue';
import Nav from '../components/Nav.vue';
import Bg from '../assets/vision/bg1.png';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import { ref, onMounted } from 'vue';

// 新增: 从后端获取文物数据
const artifacts = ref<any[]>([]);

// 新增：从后端获取管理人员数据
const managers = ref<any[]>([]);

onMounted(() => {
    fetch('/api/cols', {
        method: 'GET',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // 新增：打印获取的数据
            artifacts.value = data;
            initOverviewChart();
            initWordCloudChart(); // 新增：初始化关键词条云图
            initEraBarChart();
            initCategoryBarChart(); // 新增：初始化品类柱状图
            initYearLineChart(); // 新增：初始化折线图
            initManagerPieChart(); // 新增：初始化管理人员占比饼图
        })
        .catch(error => {
            console.error('Error fetching artifacts:', error);
        });

    // 获取管理人员数据
    fetch('/api/users')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched managers:', data); // 新增：打印获取的管理人员数据
            managers.value = data;
            initManagerPieChart(); // 初始化管理人员占比饼图
        })
        .catch(error => {
            console.error('Error fetching managers:', error);
        });
});

// 新增: 初始化数据总览图
const initOverviewChart = () => {
    if (!artifacts.value || artifacts.value.length === 0) {
        console.warn('No artifacts data available for overview chart');
        return;
    }
    const chartDom = document.querySelector('.overview-chart') as HTMLElement;
    const myChart = echarts.init(chartDom);

    const totalArtifacts = artifacts.value.length;
    const areaData = {
        '展区一': artifacts.value.filter(a => a.exhibitionArea === '展区一').length,
        '展区二': artifacts.value.filter(a => a.exhibitionArea === '展区二').length,
        '出借中': artifacts.value.filter(a => a.exhibitionArea === '出借中').length,
        '修复中': artifacts.value.filter(a => a.exhibitionArea === '修复中').length
    };

    const options = {
        title: {
            text: `文物总数：${totalArtifacts}件`,
            left: 'center',
            textStyle: {
                color: '#9EB1C8',
                fontSize: 16
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
            {
                name: '文物分布',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: areaData['展区一'], name: '展区一' },
                    { value: areaData['展区二'], name: '展区二' },
                    { value: areaData['出借中'], name: '出借中' },
                    { value: areaData['修复中'], name: '修复中' }
                ]
            }
        ]
    };
    myChart.setOption(options);
};

// 新增: 初始化关键词条云图
const initWordCloudChart = () => {
    if (!artifacts.value || artifacts.value.length === 0) {
        console.warn('No artifacts data available for word cloud chart');
        return;
    }
    const chartDom = document.querySelector('.word-cloud-chart') as HTMLElement;
    const myChart = echarts.init(chartDom);

    const wordData = artifacts.value.map(artifact => ({
        name: artifact.name,
        value: Math.floor(Math.random() * 100) + 1 // 随机权重
    }));

    const options = {
        title: {
            text: '文物名称关键词云',
            left: 'center',
            textStyle: {
                color: '#9EB1C8',
                fontSize: 16
            }
        },
        tooltip: {},
        series: [{
            type: 'wordCloud',
            gridSize: 2,
            sizeRange: [12, 50],
            rotationRange: [-90, 90],
            shape: 'circle',
            width: '100%',
            height: '100%',
            textStyle: {
                normal: {
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: wordData
        }]
    };
    myChart.setOption(options);
};

// 初始化横向柱状图：文物各年代分类
const initEraBarChart = () => {
    if (!artifacts.value || artifacts.value.length === 0) {
        console.warn('No artifacts data available for era bar chart');
        return;
    }
    const chartDom = document.querySelector('.era-bar-chart') as HTMLElement;
    const myChart = echarts.init(chartDom);
    console.log('Chart DOM:', chartDom); // 新增：打印 chartDom
    const eraData = artifacts.value.reduce((acc: { [key: string]: number }, artifact) => {
        acc[artifact.era] = (acc[artifact.era] || 0) + 1;
        return acc;
    }, {});

    console.log('Era data:', eraData); // 新增：打印 eraData 数据

    const options = {
        title: {
            text: '文物年代分布',
            left: 'center',
            textStyle: {
                color: '#9EB1C8',
                fontSize: 16
            }
        },
        xAxis: {
            type: 'value',
            show: false,
            max: 5 // 设置最大刻度为 5
        },
        yAxis: {
            type: 'category',
            data: ['汉代', '唐代', '宋代', '明代'].filter(era => eraData[era] > 0),
            inverse: true,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#9EB1C8'
            }
        },
        grid: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            containLabel: true
        },
        series: [
            {
                type: 'bar',
                data: ['汉代', '唐代', '宋代', '明代'].map(era => eraData[era] || 0),
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                },
                itemStyle: {
                    color: '#479AD3',
                    borderRadius: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 5
                },
                barWidth: 12,
                label: {
                    show: true,
                    position: 'right',
                    color: '#fff',
                }
            }
        ]
    }
    myChart.setOption(options);
};

// 初始化竖向柱状图：文物品类分布
const initCategoryBarChart = () => {
    if (!artifacts.value || artifacts.value.length === 0) {
        console.warn('No artifacts data available for category bar chart');
        return;
    }
    const chartDom = document.querySelector('.category-bar-chart') as HTMLElement;
    const myChart = echarts.init(chartDom);
    
    const categoryData = artifacts.value.reduce((acc: { [key: string]: number }, artifact) => {
        acc[artifact.category] = (acc[artifact.category] || 0) + 1;
        return acc;
    }, {});

    const options = {
        title: {
            text: '文物品类分布',
            left: 'center',
            textStyle: {
                color: '#9EB1C8',
                fontSize: 16
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: ['武器', '工艺品', '礼器', '陪葬品'].filter(category => categoryData[category] > 0),
            axisLine: {
                lineStyle: {
                    color: '#9EB1C8'
                }
            },
            axisLabel: {
                color: '#9EB1C8'
            }
        },
        yAxis: {
            type: 'value',
            show: false,
            max: 10 // 设置最大刻度为 5
        },
        grid: {
            top: 60,
            right: 0,
            bottom: 0,
            left: 0,
            containLabel: true
        },
        series: [
            {
                type: 'bar',
                data: ['武器', '工艺品', '礼器', '陪葬品'].map(category => categoryData[category] || 0),
                itemStyle: {
                    color: '#479AD3',
                    borderRadius: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 5
                },
                barWidth: 12,
                label: {
                    show: true,
                    position: 'top',
                    color: '#fff',
                }
            }
        ]
    }
    myChart.setOption(options);
};

// 新增: 初始化折线图 - 每年入库文物数量
const initYearLineChart = () => {
    if (!artifacts.value || artifacts.value.length === 0) {
        console.warn('No artifacts data available for year line chart');
        return;
    }
    const chartDom = document.querySelector('.year-line-chart') as HTMLElement;
    const myChart = echarts.init(chartDom);

    const yearData = artifacts.value.reduce((acc: { [key: string]: number }, artifact) => {
        const year = new Date(artifact.storageDate).getFullYear().toString();
        acc[year] = (acc[year] || 0) + 1;
        return acc;
    }, {});

    const years = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
    const values = years.map(year => yearData[year] || 0);

    const options = {
        title: {
            text: '每年入库文物数量',
            left: 'center',
            textStyle: {
                color: '#9EB1C8',
                fontSize: 16
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: years,
            axisLine: {
                lineStyle: {
                    color: '#9EB1C8'
                }
            },
            axisLabel: {
                color: '#9EB1C8'
            }
        },
        yAxis: {
            type: 'value',
            show: false,
            max: Math.max(...values) * 1.2 // 设置最大刻度为最大值的 1.2 倍
        },
        series: [
            {
                data: values,
                type: 'line',
                smooth: true,
                itemStyle: {
                    color: '#479AD3'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(71, 154, 211, 0.5)' },
                            { offset: 1, color: 'rgba(71, 154, 211, 0)' }
                        ],
                        global: false
                    }
                }
            }
        ]
    };
    myChart.setOption(options);
};

// 修改：初始化管理人员占比饼图
const initManagerPieChart = () => {
    if (!managers.value || managers.value.length === 0) {
        console.warn('No manager data available for pie chart');
        return;
    }
    const chartDom = document.querySelector('.manager-pie-chart') as HTMLElement;
    const myChart = echarts.init(chartDom);

    const roleData = {
        '超级管理员': managers.value.filter(m => m.role === '超级管理员').length,
        '普通管理员': managers.value.filter(m => m.role === '普通管理员').length,
        '研究人员': managers.value.filter(m => m.role === '研究人员').length
    };

    const options = {
        title: {
            text: '管理人员占比',
            left: 'center',
            textStyle: {
                color: '#9EB1C8',
                fontSize: 16
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
            {
                name: '管理人员',
                type: 'pie',
                radius: ['0%', '70%'], // 修改：将环形改为普通饼图
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: roleData['超级管理员'], name: '超级管理员' },
                    { value: roleData['普通管理员'], name: '普通管理员' },
                    { value: roleData['研究人员'], name: '研究人员' }
                ]
            }
        ]
    };
    myChart.setOption(options);
};
</script>

<style lang="scss" scoped>
.vision-container {
    display: flex;
    width: 100vw;
    height: 100vh;
}

.content-container {
    width: 85%;
    height: 100%;
    background-color: #f0f0f0;
    position: relative;

    .chart-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr; // 修改：增加一行以容纳管理人员占比饼图
        gap: 20px;
        padding: 20px;
        position: absolute;
        z-index: 2;

        .chart-item {
            width: 400px;
            height: 350px;
            background-color: rgba(255, 255, 255, 0.195);
            border-radius: 8px;
            padding: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

            &.overview-chart {
                grid-column: 2 / 3;
                grid-row: 1 / 2;
            }
            &.word-cloud-chart {
                grid-column: 1 / 3;
                grid-row: 2 / 2;
            }
            &.era-bar-chart {
                grid-column: 1 / 3;
                grid-row: 1 / 2;
            }
            &.category-bar-chart {
                grid-column: 3 / 3;
                grid-row: 1 / 2;
            }
            &.year-line-chart {
                grid-column: 3 / 3;
                grid-row: 2 / 2;
            }
            &.manager-pie-chart { // 新增：管理人员占比饼图样式
                grid-column: 2 / 3;
                grid-row: 2 / 2;
            }
        }
    }

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>