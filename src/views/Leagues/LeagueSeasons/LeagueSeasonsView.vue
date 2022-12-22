<template>
  <div class="main-container" style="font-size: 4rem">{{ Seasons }}</div>
</template>

<script>
import { useRoute } from 'vue-router';
// import axios from "axios";
export default {
  setup() {
    const route = useRoute();
    const Seasons = route.params;
    // {
    //   template: "seasons",
    //   created() {
    //     this.$watch(
    //       () => this.$route.params,
    //       (id) => {
    //         console.log(id);
    //         // console.log(season);
    //       }
    //     );
    //     console.log(this.$route.params);
    //   },
    // };

    return { Seasons };
  },
};
</script>

<style lang="scss"></style>
