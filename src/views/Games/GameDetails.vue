<template>
  <header-component></header-component>
  <main class="main-container">
    <game-widget-component
      class="center widget-80"
      :data-id="gameId"
    ></game-widget-component>
  </main>
  <footer-component></footer-component>
</template>

<script>
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import FooterComponent from "@/components/Footer/FooterComponent.vue";
import GameWidgetComponent from "@/components/Widgets/Game/GameWidgetComponent.vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    const gameId = route.params.id;
    console.log(gameId);

    return {
      gameId,
    };
  },
  components: {
    HeaderComponent,
    GameWidgetComponent,
    FooterComponent,
  },
};
</script>

<style lang="scss"></style>
