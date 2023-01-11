<template>
  <div class="main-container user">
    <form class="user__form">
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

      <div class="user__buttons">
        <button
          class="button button__light"
          type="primary"
          @click="handleRegister"
        >
          Sign Up
        </button>
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
import { ref } from 'vue';
import router from '@/router';
import { useToast } from 'vue-toastification';
export default {
  setup() {
    const firstname = ref('');
    const lastname = ref('');
    const email = ref('');
    const username = ref('');
    const password = ref('');
    const toast = useToast();

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
            toast.success('Registered correctly', {
              toastClassName: 'custom_toast',
              timeout: 1000,
            });
            router.push({ path: '/' });
          } else if (res.status === '400') {
            toast.error('Email or username are already taken', {
              toastClassName: 'custom_toast',
              timeout: 2000,
            });
          }
        },
        (err) => {
          console.log(err.response);
          toast.error(`${err.response.data.message}`, {
            toastClassName: 'custom_toast',
            timeout: 2000,
          });
        }
      );
    };

    return { firstname, lastname, email, username, password, handleRegister };
  },
};
</script>
