<template>
  <div class="main-container" style="font-size: 4rem">{{ username }}</div>
</template>

<script>
export default {
  setup() {
    const token = localStorage.getItem('token');
    const parsedToken = JSON.parse(token);
    const username = parsedToken.token.username;

    return { username };
  },
};
</script>

<style lang="scss" src="./ProfileView.scss"></style>
