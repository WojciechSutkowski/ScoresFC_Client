import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import Store from '@/store/Store';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to);
  // Refactor
  let authCheck = null;
  const token = localStorage.getItem('token');
  if (token) {
    const parsedToken = JSON.parse(token);
    authCheck = parsedToken.token.auth;
  }

  // const authCheck = localStorage.getItem("auth");

  if (authCheck) {
    Store.commit('setUserIsAuthenticated', true);
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authCheck) {
      next();
    } else {
      router.replace('/signin');
    }
  } else {
    next();
  }
});

export default router;
