// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes:Array<any> = [
    {
      // 登录路由
        path: '/login',
        name: 'Login',
        component: () => import ("../views/Login.vue")
    },
    {
      // 登录成功以后展示数据的路由
      path: '/',
      name: 'layout',
      component: () => import('../views/Home.vue'),
      meta: { requiresAuth: true },
    },
    {
        // 404
        path: '/404',
        component: () => import('../views/404.vue'),
        name: '404'
    },
    {
        // 任意路由
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any'
    }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // 示例：假设我们通过localStorage中的authToken来判断用户是否登录
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' }); // 如果未登录，则重定向到登录页面
    } else {
      next(); // 如果已登录，则允许访问
    }
  } else {
    next(); // 如果不需要认证，则允许访问
  }
});

export default router;