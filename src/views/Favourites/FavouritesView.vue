<template>
  <main style="font-size: 20px" class="main-container">{{ favourites }}</main>
</template>

<script>
import store from '@/store/index';

export default {
  setup() {
    const favourites = store.getters['favourites/favourites'];
    const { games, leagues, teams } = favourites;

    return {
      favourites,
      games,
      leagues,
      teams,
    };
  },
};
</script>

<style lang="scss"></style>
