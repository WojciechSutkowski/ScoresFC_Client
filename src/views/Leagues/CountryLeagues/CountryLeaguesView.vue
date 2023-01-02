<template>
  <div class="main-container" style="font-size: 4rem">
    <p class="info">{{ route.params.country }}</p>
    <ul class="list">
      <li
        v-for="league in leagues"
        :key="league.leagueName"
        class="list__item"
        @click="goToLeaguePage(league.leagueName)"
      >
        {{ league.leagueName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import {
  onBeforeMount,
  // computed
} from 'vue';
import router from '@/router';
import { useLeagues } from '@/store';
import { countryLeagues } from '@/mocks/countryLeagues';
export default {
  setup() {
    const route = useRoute();

    const useLeagueService = useLeagues();

    onBeforeMount(async () => {
      await useLeagueService.getCountryLeagues();
    });

    // const leagues = computed(() => useLeagueService.countryLeagues);

    const leagues = countryLeagues;

    console.log(leagues);

    function goToLeaguePage(leagueName) {
      const params = {
        country: route.params.country,
        league: leagueName,
      };

      router.push({
        name: 'League details',
        params: {
          country: params.country,
          name: params.league,
          current: true,
        },
      });

      // setTimeout(() => {
      //   location.reload();
      // }, 500);
    }
    // window.location.reload();

    return { leagues, route, goToLeaguePage };
  },
};
</script>

<style lang="scss"></style>
