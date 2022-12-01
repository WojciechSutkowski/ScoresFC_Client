<template>
  <header-component></header-component>
  <div class="main-container" style="font-size: 4rem">{{ Leagues }}</div>
  <footer-component></footer-component>
</template>

<script>
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import FooterComponent from "@/components/Footer/FooterComponent.vue";
import { useRoute } from "vue-router";
import { onUpdated } from "vue";
// import axios from "axios";
export default {
  setup() {
    const route = useRoute();
    const Leagues = route.params;

    // onBeforeRouteLeave(() => {
    //   window.location.reload();
    // });
    onUpdated(() => {
      window.location.reload();
    });

    return { Leagues };
  },
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style lang="scss"></style>
