<script lang='ts' setup>
import Nav from '../../components/Nav.vue';

</script>
<template>
    <div class="set-container">
        <!-- 左侧 导航栏 -->
        <Nav></Nav>
        <!-- 右侧 内容栏 -->
        <div class="content-container">
            设置111
        </div>
    </div>
</template>
<style lang='scss' scoped>
.set-container {
    display: flex;
    width: 100vw;
    height: 100vh;
}

.content-container {
    width: 85%;
    height: 100%;
    background-color: #f0f0f0;
}

</style>