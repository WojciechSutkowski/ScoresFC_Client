import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import store from '@/store/index';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(store._state.data.auth.userIsAuthorized);
  // console.log(to);
  // Refactor
  let authCheck = null;
  let adminCheck = null;

  const token = localStorage.getItem('token');
  if (token) {
    const parsedToken = JSON.parse(token);
    authCheck = parsedToken.token.auth;
    adminCheck = parsedToken.token.admin;
  }

  // const authCheck = localStorage.getItem("auth");

  if (authCheck) {
    store.commit('auth/setUserIsAuthenticated', true);
  }

  if (adminCheck) {
    store.commit('auth/setAdminIsAuthenticated', true);
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authCheck) {
      next();
    } else {
      router.replace('/login');
    }
  } else {
    next();
  }
});

export default router;
