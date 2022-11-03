<template>
  <router-link to="/">
    <img class="logo" src="@/assets/logo/full/Full_v1.svg" alt="logo" />
  </router-link>
  <div class="signin">
    <form class="signin__form">
      <h1>Sign in to continue</h1>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <div class="signin__buttons">
        <button type="primary">Sign In</button>
        <p>
          <span> Don't have an account? </span>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>
<style lang="scss" src="./SignInView.scss" />
