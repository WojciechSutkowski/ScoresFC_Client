<template>
  <header-component></header-component>
  <div class="main-container" style="font-size: 4rem">{{ Seasons }}</div>
  <footer-component></footer-component>
</template>

<script>
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import FooterComponent from "@/components/Footer/FooterComponent.vue";
import { useRoute } from "vue-router";
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
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style lang="scss"></style>
