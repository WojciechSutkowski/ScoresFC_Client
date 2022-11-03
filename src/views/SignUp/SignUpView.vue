<template>
  <router-link to="/">
    <img class="logo" src="@/assets/logo/full/Full_v1.svg" alt="logo" />
  </router-link>
  <div class="signup">
    <form class="signup__form">
      <h1>Sign up to continue</h1>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <div class="signup__buttons">
        <button type="primary">Sign Up</button>
        <p>
          <span> Already have an account? </span>
          <router-link to="/signin">Sign In</router-link>
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

<style lang="scss" src="./SignUpView.scss" />
