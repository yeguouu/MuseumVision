<script lang='ts' setup>
import Nav from '../components/Nav.vue';
import Search from '../components/Search.vue';
</script>
<template>
    <div class="collections-container">
        <!-- 左侧 导航栏 -->
        <Nav></Nav>
        <!-- 右侧 内容栏 -->
        <div class="content-container">
            <Search />
            <div class="quick-links">
                <a href="https://www.xxsbwg.cn/" target="_blank">
                    <img src="../assets/home/office.png" alt="新乡市博物馆" class="img1"/>
                </a>
                <a href="https://deepseek.com" target="_blank">
                    <img src="../assets/home/smart.png" alt="智能助手deepseek" />
                </a>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.collections-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    position: relative;
}

.content-container {
    width: 85%;
    height: 100%;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
}

.quick-links {
    position: absolute;
    bottom: 20px;
    display: flex;
    padding: 20px;
    justify-content: center;
    align-items: center;

    a {
        width: 550px;
        height: 300px;
        margin-left: 60px;

        img {
            width: 100%;
            height: 100%;
            transition: box-shadow 0.3s ease;

            &:hover {
                box-shadow: 4px 4px 4px 4px #888888;
            }
        }
    }
}
</style>