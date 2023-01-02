<template>
  <div class="main-container team">
    <img class="fav" v-if="useAuthService.userIsAuthorized" />
    <header class="team__header"></header>
    <div class="team__info">
      <img :src="team.response[0].team.logo" />
      <p>{{ team.response[0].team.name }}</p>
      <p>{{ team.response[0].team.founded }}</p>
      <p>{{ team.response[0].team.country }}</p>
    </div>
    <aside>
      <h2>{{ team.response[0].venue.name }}</h2>
      <p>Capacity: {{ team.response[0].venue.capacity }}</p>
      <img :src="team.response[0].venue.image" />
    </aside>

    <button @click="handleSquadRoute">Squad</button>
    <button @click="handleGamesRoute">Games</button>

    <last-games-component />
    <next-games-component />
  </div>
</template>

<script>
import { onMounted, onBeforeMount } from 'vue';
import LastGamesComponent from '@/components/TeamGames/Last/LastGamesComponent.vue';
import NextGamesComponent from '@/components/TeamGames/Next/NextGamesComponent.vue';
import { useRoute, useRouter } from 'vue-router';
import { useFavourites, useAuth } from '@/store';
import { teamDetails } from '@/mocks/teamDetails';
export default {
  setup() {
    const team = teamDetails;
    const route = useRoute();
    const router = useRouter();
    const useFavouritesService = useFavourites();
    const useAuthService = useAuth();

    const handleSquadRoute = () => {
      const params = {
        teamId: route.params.id,
      };

      router.push({
        name: 'Team squad',
        params: {
          id: params.teamId,
        },
      });
    };

    const handleGamesRoute = () => {
      const params = {
        teamId: route.params.id,
      };

      router.push({
        name: 'Team games',
        params: {
          id: params.teamId,
        },
      });
    };

    onBeforeMount(async () => {
      await useFavouritesService.getFavourites();
    });
    setTimeout(
      onMounted(async () => {
        const fav = document.querySelector('.fav');
        // const star = document.createElement('img');
        // favBtn.appendChild(star);
        // console.log(favourites.value.teams);
        console.log(fav);
        const favourites = useFavouritesService.favourites;
        // console.log(favourites.teams);
        const teams = favourites.teams;
        console.log(teams);
        if (useAuthService.userIsAuthorized) {
          let isFav;

          const setStar = () => {
            fav.setAttribute('src', require('@/assets/icons/star_fill.png'));
            fav.style = 'height: 2rem';
            // favBtn.style.backgroundColor = 'red';
            isFav = true;
          };

          const unsetStar = () => {
            fav.setAttribute('src', require('@/assets/icons/star.png'));
            fav.style = 'height: 2rem';
            // favBtn.style.backgroundColor = 'blue';
            isFav = false;
          };

          if (teams.includes(route.params.id)) {
            setStar();
          } else {
            unsetStar();
          }

          fav.onclick = function () {
            if (isFav) {
              useFavouritesService.deleteTeam(route.params.id);
              unsetStar();
            } else {
              useFavouritesService.addTeam(route.params.id);
              setStar();
            }
          };
        }
      }),
      1000
    );

    return { team, useAuthService, handleSquadRoute, handleGamesRoute };
  },
  components: { LastGamesComponent, NextGamesComponent },
};
</script>

<styles lang="scss" src="./TeamDetailsView.scss" scoped />
