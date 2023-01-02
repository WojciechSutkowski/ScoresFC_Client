<template>
  <main class="main-container">
    <game-widget class="center widget-80" :data-id="gameId"></game-widget>
    <comments-component />
  </main>
</template>

<script>
import GameWidget from '@/widgets/Game/GameWidget.vue';
import CommentsComponent from '@/components/Comments/CommentsComponent.vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();

    const gameId = route.params.id;

    return {
      gameId,
    };
  },
  beforeRouteEnter(to, from) {
    if (
      to.path !== from.path &&
      to.name === 'Match details' &&
      (from.path !== '/' || from.name === 'Home')
    ) {
      console.log(from);
      window.location.replace(to.path);
    }
  },
  beforeRouteUpdate(to, from) {
    if (to.path !== from.path && to.name === 'Match details') {
      window.location.replace(to.path);
    }
  },
  components: {
    GameWidget,
    CommentsComponent,
  },
};
</script>

<style lang="scss"></style>
