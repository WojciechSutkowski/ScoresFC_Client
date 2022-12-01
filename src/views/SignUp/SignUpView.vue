<template>
  <router-link to="/">
    <img class="logo" src="@/assets/logo/full/Full_v1.svg" alt="logo" />
  </router-link>
  <div class="signup">
    <form class="signup__form">
      <h1>Sign up to continue</h1>
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

      <div class="signup__buttons">
        <button type="primary" @click="signup">Sign Up</button>
        <p>
          <span> Already have an account? </span>
          <router-link to="/signin">Sign In</router-link>
        </p>
        <p>
          <router-link to="/">Back to home page</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router/index";
export default {
  components: {},
  setup() {
    const firstname = "";
    const lastname = "";
    const email = "";
    const username = "";
    const password = "";

    function signup(e) {
      e.preventDefault();

      let newUser = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        username: this.username,
        password: this.password,
      };

      axios.post("http://localhost:5000/users/signup-user", newUser).then(
        (res) => {
          if (res.status == "201") {
            console.log("Signed up correctly");
            router.push({ path: "/" });
            setTimeout(() => {
              location.reload();
            }, 500);
            alert("Zarejestrowano");
          }
        },
        (err) => {
          console.log(err.response);
        }
      );
    }

    return { firstname, lastname, email, username, password, signup };
  },
};
</script>

<style lang="scss" src="./SignUpView.scss" scoped />
