<template>
  <div class="main-container font-24">
    <ul class="list">
      <li
        @click="goToTeamPage(team.team.id)"
        v-for="team in teams"
        :key="team"
        class="list__item"
      >
        <div>
          <div class="league__teams__list" :id="team.team.id">
            <img
              class="league__teams__list--image"
              :src="team.team.logo"
              alt="Team logo"
            />
            <p>
              {{ team.team.name }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { onBeforeMount, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTeams } from '@/store';
import { goToTeamPage } from '@/router/helpers';
export default {
  setup() {
    const route = useRoute();
    const useTeamsService = useTeams();

    const teams = computed(() => useTeamsService.teams);

    onBeforeMount(async () => {
      await useTeamsService.getTeams(route.params.season);
    });

    return { teams, goToTeamPage };
  },
};
</script>

<styl lang="scss" src="./LeagueTeamsView.scss" scoped />
