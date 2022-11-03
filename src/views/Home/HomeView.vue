<template>
  <header-component></header-component>
  <div class="container matches">
    <games-list-component></games-list-component>
    <game-details-component></game-details-component>
  </div>
  <footer-component></footer-component>
</template>

<script>
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import FooterComponent from "@/components/Footer/FooterComponent.vue";
import GamesListComponent from "@/components/Games/List/GamesListComponent.vue";
import GameDetailsComponent from "@/components/Games/Details/GameDetailsComponent.vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    GamesListComponent,
    GameDetailsComponent,
  },
};
</script>

<style lang="scss" src="./HomeView.scss" />
