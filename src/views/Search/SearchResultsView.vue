<template>
  <div class="main-container font-24">
    <div v-if="searchType === 'league'">
      <div class="info">
        {{ searchResults.length }} leagues found for: '{{
          route.params.input
        }}''
      </div>
      <ul class="list">
        <li
          class="list__item"
          v-for="league in searchResults"
          :key="league.name"
          @click="
            goToLeaguePage(
              league.league.id,
              league.seasons[league.seasons.length - 1].year,
              league
            )
          "
        >
          <img
            class="list__item__image"
            :src="league.league.logo"
            alt="League logo"
          />
          <p>
            {{ league.league.name }}
          </p>
        </li>
      </ul>
    </div>
    <div v-if="searchType === 'team'">
      <div class="info">
        {{ searchResults.length }} teams found for: '{{ route.params.input }}''
      </div>
      <ul class="list">
        <li
          class="list__item"
          v-for="team in searchResults"
          :key="team"
          @click="goToTeamPage(team.team.id)"
        >
          <img
            class="list__item__image"
            :src="team.team.logo"
            alt="Team logo"
          />
          <p>
            {{ team.team.name }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSearch } from '@/store';
import { goToLeaguePage, goToTeamPage } from '@/router/helpers';
export default {
  setup() {
    const route = useRoute();
    const useSearchService = useSearch();
    const searchType = route.params.type;
    let searchResults;

    onBeforeMount(async () => {
      if (searchType === 'league') {
        await useSearchService.getLeagues();
      } else if (searchType === 'team') {
        await useSearchService.getTeams();
      }
    });

    if (searchType === 'league') {
      searchResults = computed(() => useSearchService.leagues);
    } else if (searchType === 'team') {
      searchResults = computed(() => useSearchService.teams);
    }

    return {
      searchType,
      searchResults,
      goToTeamPage,
      goToLeaguePage,
      route,
    };
  },
};
</script>
