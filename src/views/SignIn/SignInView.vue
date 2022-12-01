<template>
  <router-link to="/">
    <img class="logo" src="@/assets/logo/full/Full_v1.svg" alt="logo" />
  </router-link>
  <div class="signin">
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
import axios from "axios";
import router from "@/router/index";
import Store from "@/store/Store";
export default {
  components: {},
  setup() {
    const username = "";
    const password = "";

    function signin(e) {
      e.preventDefault();

      let checkUser = {
        username: this.username,
        password: this.password,
      };

      if (window.location.href === "http://localhost:8080/signin") {
        axios.post("http://localhost:5000/users/signin-user", checkUser).then(
          (res) => {
            if (res.status == "200") {
              console.log("Signed in correctly");
              Store.commit("setUserIsAuthenticated", true);
              const token = {
                username: res.data.username,
                auth: true,
              };
              localStorage.setItem("token", JSON.stringify({ token }));
              localStorage.setItem("username", res.data.username);
              localStorage.setItem("auth", true);
              router.push({ path: "/" });
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
        axios.post("http://localhost:5000/users/signin-admin", checkUser).then(
          (res) => {
            if (res.status == "200") {
              console.log("Signed in correctly");
              Store.commit("setUserIsAuthenticated", true);
              const token = {
                username: res.data.username,
                auth: true,
              };
              localStorage.setItem("token", JSON.stringify({ token }));
              localStorage.setItem("username", res.data.username);
              localStorage.setItem("auth", true);
              router.push({ path: "/" });
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
