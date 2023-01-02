<template>
  <main style="font-size: 20px" class="main-container favourites">
    <ul class="favourites__list">
      <h3>Games</h3>
      <p v-if="favourites.games.length === 0">None</p>
      <li v-for="game in favourites.games" :key="game">{{ game }}</li>
    </ul>
    <ul class="favourites__list">
      <h3>Leagues</h3>
      <p v-if="favourites.leagues.length === 0">None</p>
      <li v-for="league in favourites.leagues" :key="league">{{ league }}</li>
    </ul>
    <ul class="favourites__list">
      <h3>Teams</h3>
      <p v-if="favourites.teams.length === 0">None</p>
      <li v-for="team in favourites.teams" :key="team">{{ team }}</li>
    </ul>
  </main>
</template>

<script>
import { useFavourites } from '@/store';
import { onBeforeMount, computed, onMounted } from 'vue';

export default {
  setup() {
    const useFavouritesService = useFavourites();
    const favourites = computed(() => useFavouritesService.favourites);

    onBeforeMount(async () => {
      await useFavouritesService.getFavourites();
    });

    onMounted(() => {
      for (let i = 0; i < favourites.value.teams.length; i++) {
        console.log(`Send request for team ${favourites.value.teams[i]}`);
      }
    });

    return {
      favourites,
    };
  },
};
</script>

<style lang="scss" src="./FavouritesView.scss" />
