<template>
  <div class="main-container login">
    <form class="login__form">
      <h1>Login to continue</h1>
      <input type="text" placeholder="Username" v-model="username" required />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />

      <div class="login__buttons">
        <button type="primary" @click="handleLogin">Login</button>
        <p>
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
import router from '@/router/index';
import { useAuth } from '@/store';
import { useToast } from 'vue-toastification';
import { ref } from 'vue';
export default {
  setup() {
    const username = ref('');
    const password = ref('');

    const useAuthService = useAuth();
    const toast = useToast();

    function handleLogin(e) {
      e.preventDefault();

      let checkUser = {
        username: username.value,
        password: password.value,
      };

      if (window.location.href === 'http://localhost:8080/login') {
        axios.post('http://localhost:5000/users/login-user', checkUser).then(
          (res) => {
            if (res.status == '200') {
              useAuthService.setUserIsAuthenticated(true);
              useAuthService.setToken(res.data.token);
              console.log(useAuthService.token);
              const token = {
                username: res.data.username,
                auth: true,
              };
              localStorage.setItem('token', JSON.stringify({ token }));
              localStorage.setItem('username', res.data.username);
              localStorage.setItem('auth', true);
              router.push({ path: '/' });
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
              useAuthService.setUserIsAuthenticated(true);
              useAuthService.setAdminIsAuthenticated(true);
              useAuthService.setToken(res.data.token);
              console.log(useAuthService.token);
              const token = {
                username: res.data.username,
                auth: true,
                admin: true,
              };
              localStorage.setItem('token', JSON.stringify({ token }));
              localStorage.setItem('username', res.data.username);
              localStorage.setItem('auth', true);
              localStorage.setItem('admin', true);
              router.push({ path: '/admin' });
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
    }

    return { username, password, handleLogin, toast };
  },
};
</script>
<style lang="scss" src="./LoginView.scss" scoped />
