<template>
  <header-component></header-component>
  <main class="main-container">
    <games-widget-component class="center widget-80"></games-widget-component>
  </main>
  <footer-component></footer-component>
</template>

<script>
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import FooterComponent from "@/components/Footer/FooterComponent.vue";
import GamesWidgetComponent from "@/components/Widgets/Games/GamesWidgetComponent.vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    GamesWidgetComponent,
  },
};
</script>

<style lang="scss" src="./HomeView.scss" />
