<template>
  <!-- <i> "{{ result.data }}" </i> -->
  <!-- <div>
    <router-link to="/">Home</router-link>
    <router-link :to="{ name: 'Sign In' }">Sign In</router-link>
  </div> -->
  <router-view />
</template>

<script>
// import axios from "axios";
// import { ref } from "vue";

export default {
  ////////////////////////////
  // setup() {
  //   const result = ref();
  //   axios
  //     .get("http://localhost:5001/venue/21")
  //     .then((data) => (result.value = data));
  //   return { result };
  // },
  ////////////////////////////

  components: {},
};
</script>

<style lang="scss" src="./main.scss" />
