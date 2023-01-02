<template>
  <ul>
    <li v-for="game in games" :key="game">
      <div @click="handleGameRoute(game.fixture.id)">
        <div>{{ game.teams.home.name }}</div>
        <div>{{ game.teams.away.name }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import { teamNext } from '@/mocks/teamNext5';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const games = teamNext;
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

    return {
      games,
      handleGameRoute,
    };
  },
};
</script>

<style lang="scss" />
