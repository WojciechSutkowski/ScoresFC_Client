<template>
  <div class="main-container">
    <div v-if="searchType === 'league'">
      <ul v-for="league in searchResults" :key="league.name">
        <li @click="goToLeaguePage(league.country.name, league.league.name)">
          {{ league.league.name }}
        </li>
      </ul>
    </div>
    <div v-if="searchType === 'team'">
      <ul v-for="team in searchResults" :key="team">
        <li @click="goToTeamPage(team.team.id)">
          {{ team.team.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { useSearch } from '@/store';
import {
  onBeforeMount,
  // computed
} from 'vue';
import { searchLeague } from '@/mocks/searchLeague';
import { searchTeam } from '@/mocks/searchTeam';
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const searchType = route.params.type;

    console.log(searchLeague);

    const useSearchService = useSearch();

    onBeforeMount(async () => {
      if (searchType === 'league') {
        await useSearchService.getLeagues();
      } else if (searchType === 'team') {
        await useSearchService.getTeams();
      }
    });

    let searchResults;

    if (searchType === 'league') {
      // searchResults = computed(() => useSearchService.leagues);
      searchResults = searchLeague;
      console.log(searchResults);
    } else if (searchType === 'team') {
      // searchResults = computed(() => useSearchService.teams);
      searchResults = searchTeam;
      console.log(searchResults);
    }

    function goToTeamPage(teamId) {
      const params = {
        id: teamId,
      };

      router.push({
        name: 'Team details',
        params: {
          id: params.id,
        },
      });
    }

    function goToLeaguePage(leagueCountry, leagueName) {
      const params = {
        country: leagueCountry,
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
    }

    return {
      searchType,
      goToTeamPage,
      goToLeaguePage,
      searchResults,
    };
  },
};
</script>

<style></style>
