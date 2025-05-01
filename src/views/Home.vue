<script lang='ts' setup>
import Nav from '../components/Nav.vue';
import Search from '../components/Search.vue';
import Header from '../components/Header.vue';
import Admin from '../components/Admin.vue';
</script>
<template>
    <!-- 上方标题 -->
    <Header></Header>
    <div class="collections-container">
        <!-- 左侧 导航栏 -->
        <Nav></Nav>
        <!-- 右侧 内容栏 -->
        <div class="content-container">

            <Admin></Admin>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.collections-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
}

.content-container {
    width: 85%;
    height: 100%;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>