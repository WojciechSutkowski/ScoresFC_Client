<template>
  <div class="main-container font-24">
    <h2 class="info font-36">{{ seasons[0].league.name }}</h2>
    <ul class="list">
      <li
        v-for="season in seasons[0].seasons.reverse()"
        :key="season"
        class="list__item"
        @click="goToLeaguePage(seasons[0].league.id, season.year)"
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
import { onBeforeMount, computed } from 'vue';
import { useLeagues } from '@/store';
import { goToLeaguePage } from '@/router/helpers';
export default {
  setup() {
    const useLeagueService = useLeagues();

    onBeforeMount(async () => {
      await useLeagueService.getSeasons();
    });

    const seasons = computed(() => useLeagueService.seasons);

    return { seasons, goToLeaguePage };
  },
};
</script>
