<template>
    <div class="admin">
        <div class="left">欢迎回来！</div>
        <div class="right">
            <div class="name">admin</div>
            <div class="out" @click="outLogin">退出登录</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const outLogin = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};
</script>

<style lang="scss" scoped>
.admin {
    width: 90%;
    height: 150px;
    border-radius: 20px;
    box-shadow: 5px 8px 5px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    margin-top: 20px;
    display: flex;
    align-items: center;
    padding: 30px;
    font-size: 20px;
    color: #2a2828;

    .left {
        margin-left: 20%;
        width: 200px;
    }

    .right {
        width: 200px;
        margin-left: 40%;

        .out {
            margin-top: 30px;
            cursor: pointer;
            color: #375dc8;
        }
    }
}
</style>