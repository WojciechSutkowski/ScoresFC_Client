<template>
  <div class="main-container font-24">
    <p class="info">{{ route.params.country }}</p>
    <ul class="list">
      <li
        v-for="league in leagues"
        :key="league.leagueName"
        class="list__item"
        @click="
          goToLeaguePage(
            league.leagueId,
            league.leagueSeasons[league.leagueSeasons.length - 1].year,
            league
          )
        "
      >
        {{ league.leagueName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { onBeforeMount, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useLeagues } from '@/store';
import { goToLeaguePage } from '@/router/helpers';
export default {
  setup() {
    const route = useRoute();
    const useLeagueService = useLeagues();

    const leagues = computed(() => useLeagueService.countryLeagues);

    onBeforeMount(async () => {
      await useLeagueService.getCountryLeagues();
    });

    return { route, leagues, goToLeaguePage };
  },
};
</script>
