<template>
  <div class="main-container team">
    <ul>
      <li v-for="game in games" :key="game">
        <div @click="handleGameRoute(game.fixture.id)">
          <div>{{ game.teams.home.name }}</div>
          <div>{{ game.teams.away.name }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import { useLeagueGames } from '@/store';
import { useRouter } from 'vue-router';
import { leagueMatches } from '@/mocks/leagueMatches';
// import { onBeforeMount, computed } from 'vue';
export default {
  setup() {
    const router = useRouter();
    // const useLeagueGamesService = useLeagueGames();

    // onBeforeMount(async () => {
    //   await useLeagueGamesService.getGames();
    // });

    // const games = computed(() => useLeagueGamesService.games);
    const games = leagueMatches;

    const handleGameRoute = (gameId) => {
      const params = {
        gameId: gameId,
      };

      router.push({
        name: 'Game details',
        params: {
          id: params.gameId,
        },
      });
    };

    return { games, handleGameRoute };
  },
};
</script>

<styles lang="scss" scoped />
