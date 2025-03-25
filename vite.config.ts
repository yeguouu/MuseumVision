import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // 目标服务器地址
                changeOrigin: true, // 是否改变请求源
                rewrite: (path) => path.replace(/^\/api/, '') // 重写路径
            }
        }
    }
});
