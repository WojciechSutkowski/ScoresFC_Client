<template>
  <div class="main-container league" style="font-size: 4rem">
    <header class="league__header">
      <div class="league__header__info">
        <img class="league__header__logo" :src="league.league.logo" />
        <div class="league__header__names">
          <p>
            {{ league.league.name }}
          </p>
          <div class="league__header__country">
            <img
              class="league__header__country--flag"
              :src="league.country.flag"
            />
            <p class="league__header__country--name">
              {{ league.country.name }}
            </p>
          </div>
        </div>
      </div>
      <div class="league__header__container">
        <div class="league__header__season">
          <p>Season {{ league.seasons[0].start.slice(0, 4) }}</p>
          <p
            v-if="
              league.seasons[0].start.slice(0, 4) !==
              league.seasons[0].end.slice(0, 4)
            "
          >
            /{{ league.seasons[0].end.slice(0, 4) }}
          </p>
        </div>
        <button class="button__light" @click="handleSeasonsRoute">
          Archive seasons
        </button>
      </div>
    </header>
    <main class="league__main">
      <div class="league__main__submenu">
        <button @click="handleGamesRoute('finished')" class="button__light">
          Finished
        </button>
        <button @click="handleGamesRoute('live')" class="button__light">
          Live
        </button>
        <button @click="handleGamesRoute('not-started')" class="button__light">
          Not started
        </button>
      </div>

      <div
        class="matches"
        style="min-height: 20rem; min-width: 20rem; background-color: red"
      >
        Last 10 matches
      </div>

      <standings-widget
        class="center widget-80"
        :data-league="league.league.id"
        :data-season="league.seasons[0].year"
      ></standings-widget>
    </main>
  </div>
</template>

<script>
import StandingsWidget from '@/widgets/Standings/StandingsWidget.vue';
import {
  onBeforeMount,
  // computed
} from 'vue';
import { useLeagues } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import { leagueDetails } from '@/mocks/leagueDetails';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    console.log(router);
    console.log(route.params);
    const useLeagueService = useLeagues();

    onBeforeMount(async () => {
      await useLeagueService.getLeague();
    });

    // const league = computed(() => useLeagueService.league);
    const league = leagueDetails;

    console.log(league);

    const handleSeasonsRoute = () => {
      const params = {
        country: route.params.country,
        name: route.params.name,
      };

      router.push({
        name: 'League seasons',
        params: {
          country: params.country,
          name: params.name,
        },
      });
    };

    const handleGamesRoute = (type) => {
      const params = {
        leagueId: league.league.id,
        season: league.seasons[0].year,
        type: type,
      };

      router.push({
        name: 'League games',
        params: {
          id: params.leagueId,
          season: params.season,
          type: params.type,
        },
      });
    };

    return {
      league,
      handleSeasonsRoute,
      handleGamesRoute,
    };
  },
  components: {
    StandingsWidget,
  },
};
</script>

<style lang="scss" src="./LeagueDetailsView.scss" scoped />
