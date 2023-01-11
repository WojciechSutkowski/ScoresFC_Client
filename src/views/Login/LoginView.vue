<template>
  <div class="main-container user">
    <form class="user__form">
      <h1 v-if="router.currentRoute.value.path === '/login-admin'">ADMIN</h1>
      <h1>Login to continue</h1>
      <input type="text" placeholder="Username" v-model="username" required />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />

      <div class="user__buttons">
        <button
          class="button button__light"
          type="primary"
          @click="handleLogin"
        >
          Login
        </button>
        <p v-if="router.currentRoute.value.path !== '/login-admin'">
          <span> Don't have an account? </span>
          <router-link to="/register">Register</router-link>
        </p>
        <p>
          <router-link to="/">Back to home page</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useAuth } from '@/store';
import router from '@/router';
import { useToast } from 'vue-toastification';
export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const useAuthService = useAuth();
    const toast = useToast();

    const handleLogin = (e) => {
      e.preventDefault();

      const checkUser = {
        username: username.value,
        password: password.value,
      };

      if (window.location.href === 'http://localhost:8080/login') {
        axios.post('http://localhost:5000/users/login-user', checkUser).then(
          (res) => {
            if (res.status == '200') {
              toast.success('Logged in correctly', {
                toastClassName: 'custom_toast',
                timeout: 2000,
              });

              const token = {
                username: res.data.username,
                auth: true,
                bearer: res.data.token,
              };
              localStorage.setItem('token', JSON.stringify({ token }));
              useAuthService.setUserIsAuthenticated(true);

              router.push({ path: '/profile' });
            }
          },
          (err) => {
            console.log(err.response);
            toast.error('Incorrect credentials', {
              toastClassName: 'custom_toast',
              timeout: 2000,
            });
          }
        );
      } else {
        axios.post('http://localhost:5000/users/login-admin', checkUser).then(
          (res) => {
            if (res.status == '200') {
              toast.success('Logged in correctly', {
                toastClassName: 'custom_toast',
                timeout: 2000,
              });

              const token = {
                username: res.data.username,
                admin: true,
                auth: true,
                bearer: res.data.token,
              };
              localStorage.setItem('token', JSON.stringify({ token }));
              useAuthService.setUserIsAuthenticated(true);
              useAuthService.setAdminIsAuthenticated(true);

              router.push({ path: '/profile' });
            }
          },
          (err) => {
            console.log(err.response);
            toast.error('Incorrect credentials', {
              toastClassName: 'custom_toast',
              timeout: 2000,
            });
          }
        );
      }
    };

    return { username, password, handleLogin, toast, router };
  },
};
</script>
