import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { useAuth } from '@/store';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const useAuthService = useAuth();

  let authCheck = null;
  let adminCheck = null;

  const token = localStorage.getItem('token');
  if (token) {
    const parsedToken = JSON.parse(token);
    authCheck = parsedToken.token.auth;
    adminCheck = parsedToken.token.admin;
  }

  if (authCheck) {
    useAuthService.setUserIsAuthenticated(true);
  }

  if (adminCheck) {
    useAuthService.setAdminIsAuthenticated(true);
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

  if (authCheck) {
    if (to.path === '/login' || to.path === '/register') {
      router.replace('/profile');
    } else {
      next();
    }
    if (to.path === '/login-admin') {
      router.replace('/admin');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
