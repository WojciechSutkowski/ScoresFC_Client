<template>
  <div class="main-container font-24">
    <div class="info squad font-36">
      <img class="info__image" :src="squad.team.logo" alt="Team logo" />
      <p>{{ squad.team.name }}</p>
    </div>
    <ul class="list">
      <li class="list__item" v-for="player in squad.players" :key="player">
        <div class="squad__player" @click="goToPlayerPage(player.id)">
          <p class="squad__player__position">
            {{ player.position }}
          </p>
          <div class="squad__player__data">
            <p class="squad__player__data--number">
              {{ player.number }}
            </p>
            <img
              class="squad__player__data--photo"
              :src="player.photo"
              alt="Player face image"
            />
            <p class="squad__player__data--name">
              {{ player.name }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { onBeforeMount, computed } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { usePlayers } from '@/store';
export default {
  setup() {
    const route = useRoute();
    const usePlayersService = usePlayers();

    const squad = computed(() => usePlayersService.squad);

    onBeforeMount(async () => {
      await usePlayersService.getTeamSquad(route.params.id);
    });

    const goToPlayerPage = (playerId) => {
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

    return { squad, goToPlayerPage };
  },
};
</script>

<styles lang="scss" src="./TeamSquadView.scss" scoped />
