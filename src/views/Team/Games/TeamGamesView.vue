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
import { useRouter } from 'vue-router';
import { teamMatches } from '@/mocks/teamMatches';
export default {
  setup() {
    const games = teamMatches;
    const router = useRouter();

    const handleGameRoute = (gameId) => {
      const params = {
        gameId: gameId,
      };

      router.push({
        name: 'Match details',
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
