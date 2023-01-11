<template>
  <div class="main-container player">
    <header class="player__header info">
      <img class="player__header__img" :src="player.player.photo" />
      <div class="player__header__info">
        <p class="player__header__info--name">
          {{ player.player.firstname }} {{ player.player.lastname }} ({{
            player.player.age
          }})
        </p>
        <p class="player__header__info--country">
          Nationality: {{ player.player.nationality }}
        </p>
        <p class="player__header__info--born">
          Born {{ player.player.birth.date }} in
          {{ player.player.birth.place }}, {{ player.player.birth.country }}
        </p>
      </div>
    </header>
    <main>
      <ul class="list">
        <li
          @click="goToTeamPage(team.team.id)"
          v-for="league in player.statistics"
          :key="league"
          class="list__item"
        >
          <div class="player__stats">
            <img class="player__stats__team--logo" :src="league.team.logo" />
            <div class="player__stats__team">
              <p class="player__stats__team--name">
                {{ league.team.name }}
              </p>
              <p class="player__stats__team--league">
                {{ league.league.name }}
              </p>
            </div>
            <div class="player__stats__appearences">
              <p>Appearences: {{ league.games.appearences }}</p>
              <p>Minutes: {{ league.games.minutes }}</p>
            </div>
            <div class="player__stats__goals">
              <p>Goals scored: {{ league.goals.total }}</p>
              <p>Goals conceded: {{ league.goals.conceded }}</p>
            </div>
            <div class="player__stats__cards">
              <p>Yellow cards: {{ league.cards.yellow }}</p>
              <p>Red cards (2 yellow cards): {{ league.cards.yellowred }}</p>
              <p>Red cards straight: {{ league.cards.red }}</p>
            </div>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { onBeforeMount, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePlayers } from '@/store';
export default {
  setup() {
    const route = useRoute();
    const usePlayersService = usePlayers();

    const player = computed(() => usePlayersService.player);

    onBeforeMount(async () => {
      await usePlayersService.getPlayerById(route.params.id);
    });

    return { player };
  },
};
</script>

<style lang="scss" src="./PlayerDetailsView.scss" scoped />
