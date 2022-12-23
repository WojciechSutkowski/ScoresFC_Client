<template>
  <main style="font-size: 20px" class="main-container">{{ favourites }}</main>
</template>

<script>
import { useFavourites } from '@/store';

export default {
  setup() {
    const useFavouritesService = useFavourites();
    const favourites = useFavouritesService.favourites;
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
