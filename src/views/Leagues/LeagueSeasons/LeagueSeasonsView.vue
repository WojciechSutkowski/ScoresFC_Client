<template>
  <div class="main-container" style="font-size: 4rem">
    <h2 class="seasons__league">{{ seasons.league.name }}</h2>
    <ul class="list">
      <li
        v-for="season in seasons.seasons.reverse()"
        :key="season"
        class="list__item"
        @click="goToLeagueSeason(season.year)"
      >
        <p>{{ season.start.slice(0, 4) }}</p>
        <p v-if="season.start.slice(0, 4) !== season.end.slice(0, 4)">
          /{{ season.end.slice(0, 4) }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
// import { useRoute } from 'vue-router';
import { useLeagues } from '@/store';
import {
  onBeforeMount,
  // computed
} from 'vue';
import { leagueSeasons } from '@/mocks/leagueSeasons';
import { useRoute, useRouter } from 'vue-router';
export default {
  setup() {
    const useLeagueService = useLeagues();
    const router = useRouter();
    const route = useRoute();
    console.log(router);
    console.log(route.params);

    onBeforeMount(async () => {
      await useLeagueService.getSeasons();
    });

    // const seasons = computed(() => useLeagueService.seasons);
    const seasons = leagueSeasons;

    console.log(seasons);

    const goToLeagueSeason = (season) => {
      console.log(`${season}`);
      const params = {
        country: route.params.country,
        name: route.params.name,
        season: season,
      };

      router.push({
        name: 'League details',
        params: {
          country: params.country,
          name: params.name,
          season: params.season,
        },
      });
    };

    return { seasons, goToLeagueSeason };
  },
};
</script>

<styl lang="scss" src="./LeagueSeasonsView.scss" scoped />
