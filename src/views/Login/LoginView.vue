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
import { ref } from 'vue';
export default {
  setup() {
    const username = ref('');
    const password = ref('');

    const useAuthService = useAuth();

    function handleLogin(e) {
      e.preventDefault();

      let checkUser = {
        username: username.value,
        password: password.value,
      };

      // console.log(store.state);

      if (window.location.href === 'http://localhost:8080/login') {
        axios.post('http://localhost:5000/users/login-user', checkUser).then(
          (res) => {
            if (res.status == '200') {
              console.log('Signed in correctly');
              // store.commit('auth/setUserIsAuthenticated', true);
              useAuthService.setUserIsAuthenticated(true);
              const token = {
                username: res.data.username,
                auth: true,
              };
              localStorage.setItem('token', JSON.stringify({ token }));
              localStorage.setItem('username', res.data.username);
              localStorage.setItem('auth', true);
              router.push({ path: '/' });
              setTimeout(() => {
                location.reload();
              }, 500);
              // console.log(store.state);
            }
          },
          (err) => {
            console.log(err.response);
          }
        );
      } else {
        axios.post('http://localhost:5000/users/login-admin', checkUser).then(
          (res) => {
            if (res.status == '200') {
              console.log('Signed in correctly');
              // store.commit('auth/setUserIsAuthenticated', true);
              // store.commit('auth/setAdminIsAuthenticated', true);
              useAuthService.setUserIsAuthenticated(true);
              useAuthService.setAdminIsAuthenticated(true);
              const token = {
                username: res.data.username,
                auth: true,
                admin: true,
              };
              localStorage.setItem('token', JSON.stringify({ token }));
              localStorage.setItem('username', res.data.username);
              localStorage.setItem('auth', true);
              localStorage.setItem('admin', true);
              router.push({ path: '/' });
              setTimeout(() => {
                location.reload();
              }, 500);
            }
          },
          (err) => {
            console.log(err.response);
          }
        );
      }
    }

    return { username, password, handleLogin };
  },
};
</script>
<style lang="scss" src="./LoginView.scss" scoped />
