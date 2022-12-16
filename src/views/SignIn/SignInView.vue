<template>
  <div class="main-container signin">
    <form class="signin__form">
      <h1>Sign in to continue</h1>
      <input type="text" placeholder="Username" v-model="username" required />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />

      <div class="signin__buttons">
        <button type="primary" @click="signin">Sign In</button>
        <p>
          <span> Don't have an account? </span>
          <router-link to="/signup">Sign Up</router-link>
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
import Store from '@/store/Store';
import { ref } from 'vue';
export default {
  setup() {
    const username = ref('');
    const password = ref('');

    function signin(e) {
      e.preventDefault();

      let checkUser = {
        username: username.value,
        password: password.value,
      };

      if (window.location.href === 'http://localhost:8080/signin') {
        axios.post('http://localhost:5000/users/signin-user', checkUser).then(
          (res) => {
            if (res.status == '200') {
              console.log('Signed in correctly');
              Store.commit('setUserIsAuthenticated', true);
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
            }
          },
          (err) => {
            console.log(err.response);
          }
        );
      } else {
        axios.post('http://localhost:5000/users/signin-admin', checkUser).then(
          (res) => {
            if (res.status == '200') {
              console.log('Signed in correctly');
              Store.commit('setUserIsAuthenticated', true);
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
            }
          },
          (err) => {
            console.log(err.response);
          }
        );
      }
    }

    return { username, password, signin };
  },
};
</script>
<style lang="scss" src="./SignInView.scss" scoped />
