<template>
  <div class="main-container team">
    <ul>
      <li v-for="player in squad.players" :key="player">
        <div @click="handlePlayerRoute(player.id)">{{ player.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
// import { onMounted, onBeforeMount } from 'vue';
// import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
// import { useFavourites, useAuth } from '@/store';
import { teamSquad } from '@/mocks/teamSquad';
export default {
  setup() {
    const squad = teamSquad;
    const router = useRouter();

    const handlePlayerRoute = (playerId) => {
      const params = {
        playerId: playerId,
      };

      router.push({
        name: 'Player details',
        params: {
          id: params.playerId,
        },
      });
    };

    return { squad, handlePlayerRoute };
  },
};
</script>

<styles lang="scss" src="./TeamSquadView.scss" scoped />
