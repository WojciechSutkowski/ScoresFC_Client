<template>
  <div class="main-container register">
    <form class="register__form">
      <h1>Register to continue</h1>
      <input
        type="text"
        placeholder="First name"
        v-model="firstname"
        required
      />
      <input type="text" placeholder="Last name" v-model="lastname" required />
      <input type="email" placeholder="Email" v-model="email" required />
      <input type="text" placeholder="Username" v-model="username" required />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />

      <div class="register__buttons">
        <button type="primary" @click="handleRegister">Sign Up</button>
        <p>
          <span> Already have an account? </span>
          <router-link to="/login">Login</router-link>
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
import { ref } from 'vue';
export default {
  setup() {
    const firstname = ref('');
    const lastname = ref('');
    const email = ref('');
    const username = ref('');
    const password = ref('');

    const handleRegister = (e) => {
      e.preventDefault();

      let newUser = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        username: username.value,
        password: password.value,
      };

      axios.post('http://localhost:5000/users/register-user', newUser).then(
        (res) => {
          if (res.status == '201') {
            console.log('Signed up correctly');
            router.push({ path: '/' });
            setTimeout(() => {
              location.reload();
            }, 500);
            alert('Zarejestrowano');
          }
        },
        (err) => {
          console.log(newUser);
          console.log(err.response);
        }
      );
    };

    return { firstname, lastname, email, username, password, handleRegister };
  },
};
</script>

<style lang="scss" src="./RegisterView.scss" scoped />
