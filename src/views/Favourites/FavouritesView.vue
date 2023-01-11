<template>
  <main class="main-container favourites">
    <ul class="list">
      <h3 class="info">GAMES</h3>
      <p class="info" v-if="favourites.games.length === 0">
        No games in favourites
      </p>
      <li v-for="game in games" :key="game">
        <div>
          <div class="custom__matches__league" :id="game.league.id">
            <p>{{ game.league.country }}:</p>
            <p>
              {{ game.league.name }}
            </p>
          </div>
          <div class="custom__matches__game" :id="game.fixture.id">
            <div class="custom__matches__game__state">
              {{ game.fixture.status.short }}
            </div>
            <div
              @click="goToGamePage(game.fixture.id)"
              class="custom__matches__teams"
            >
              <div class="custom__matches__team">
                <img
                  class="custom__matches__team--logo"
                  :src="game.teams.home.logo"
                  alt="Home team logo"
                />
                <div class="custom__matches__team--score">
                  <p>
                    {{ game.teams.home.name }}
                  </p>
                  <p>{{ game.goals.home }}</p>
                </div>
              </div>
              <div class="custom__matches__team">
                <img
                  class="custom__matches__team--logo"
                  :src="game.teams.away.logo"
                  alt="Away team logo"
                />
                <div class="custom__matches__team--score">
                  <p>
                    {{ game.teams.away.name }}
                  </p>
                  <p>{{ game.goals.away }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <ul class="list">
      <h3 class="info">LEAGUES</h3>
      <p class="info" v-if="favourites.leagues.length === 0">
        No leagues in favourites
      </p>
      <li
        class="list__item"
        @click="goToLeaguePage(league.league.id, league.seasons[0].year)"
        v-for="league in leagues"
        :key="league"
      >
        <div class="logo_container">
          <img class="fav_logo" :src="league.league.logo" alt="League logo" />
        </div>
        <p>{{ league.country.name }}</p>
        <p>: {{ league.league.name }}</p>
      </li>
    </ul>

    <ul class="list">
      <h3 class="info">TEAMS</h3>
      <p class="info" v-if="favourites.teams.length === 0">
        No teams in favourites
      </p>
      <li
        class="list__item"
        v-for="team in teams"
        @click="goToTeamPage(team.team.id)"
        :key="team"
      >
        <div class="logo_container">
          <img class="fav_logo" :src="team.team.logo" alt="Team logo" />
        </div>
        <p>
          {{ team.team.name }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
import { onBeforeMount, onMounted, computed, reactive } from 'vue';
import { useGame, useFavourites, useLeagues, useTeams } from '@/store';
import { goToGamePage, goToLeaguePage, goToTeamPage } from '@/router/helpers';
export default {
  setup() {
    const useGameService = useGame();
    const useFavouritesService = useFavourites();
    const useLeaguesService = useLeagues();
    const useTeamsService = useTeams();

    const favourites = computed(() => useFavouritesService.favourites);

    let games = reactive([]);
    let leagues = reactive([]);
    let teams = reactive([]);
    let game, league, team;

    onBeforeMount(async () => {
      await useFavouritesService.getFavourites();
    });

    onMounted(async () => {
      for (let i = 0; i < favourites.value.games.length; i++) {
        await useGameService.getGameById(favourites.value.games[i]);
        game = computed(() => useGameService.game);
        games.push(game.value);
      }

      for (let i = 0; i < favourites.value.leagues.length; i++) {
        await useLeaguesService.getLeagueById(favourites.value.leagues[i]);
        league = computed(() => useLeaguesService.league);
        leagues.push(league.value);
      }

      for (let i = 0; i < favourites.value.teams.length; i++) {
        await useTeamsService.getTeamById(favourites.value.teams[i]);
        team = computed(() => useTeamsService.team);
        teams.push(team.value);
      }
    });

    return {
      favourites,
      games,
      leagues,
      teams,
      goToGamePage,
      goToLeaguePage,
      goToTeamPage,
    };
  },
  beforeRouteEnter(to, from) {
    if (
      to.path !== from.path &&
      to.name === 'Favourites' &&
      (from.path !== '/' || from.name === 'Home')
    ) {
      window.location.replace(to.path);
    }
  },
  beforeRouteUpdate(to, from) {
    if (to.path !== from.path && to.name === 'Favourites') {
      window.location.replace(to.path);
    }
  },
};
</script>

<style lang="scss" src="./FavouritesView.scss" />
