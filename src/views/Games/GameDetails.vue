<template>
  <main class="main-container">
    <game-widget-component
      class="center widget-80"
      :data-id="gameId"
    ></game-widget-component>
  </main>
</template>

<script>
import GameWidgetComponent from '@/widgets/Game/GameWidgetComponent.vue';
import { useRoute } from 'vue-router';

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
    GameWidgetComponent,
  },
};
</script>

<style lang="scss"></style>
