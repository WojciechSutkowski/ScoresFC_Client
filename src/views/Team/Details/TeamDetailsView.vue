<template>
  <div class="main-container team">
    <header class="team__header info">
      <div
        class="team__header__favourites"
        v-if="useAuthService.userIsAuthorized"
      >
        <img class="team__header__star" />
        <p class="font-24">Add to favourites</p>
      </div>
      <img class="team__header__logo" :src="team.team.logo" alt="Team logo" />
      <div class="team__header__info">
        <p class="team__header__info--name">{{ team.team.name }}</p>
        <p class="team__header__info--date">
          Founded in {{ team.team.founded }}
        </p>
        <p class="team__header__info--country">
          {{ team.team.country }}
        </p>
      </div>
      <div class="team__submenu">
        <button class="button button__dark" @click="goToSquadPage">
          Squad
        </button>
        <button class="button button__dark" @click="goToTeamGamesPage">
          All games
        </button>
      </div>
    </header>
    <aside class="team__stadium info">
      <h2 v-if="team.venue.capacity === null">No stadium data</h2>
      <h2 class="font-24">{{ team.venue.name }}</h2>
      <p class="team__stadium__capacity" v-if="team.venue.capacity !== null">
        Capacity: {{ team.venue.capacity }}
      </p>
      <img
        class="team__stadium__image"
        :src="team.venue.image"
        alt="Stadium image"
      />
    </aside>

    <last-games-component class="team__last" />
    <next-games-component class="team__next" />
  </div>
</template>

<script>
import LastGamesComponent from '@/components/Games/Last/LastGamesComponent.vue';
import NextGamesComponent from '@/components/Games/Next/NextGamesComponent.vue';
import { onBeforeMount, computed } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { useAuth, useFavourites, useTeams } from '@/store';
export default {
  setup() {
    const route = useRoute();
    const useAuthService = useAuth();
    const useFavouritesService = useFavourites();
    const useTeamsService = useTeams();

    const team = computed(() => useTeamsService.team);

    onBeforeMount(async () => {
      await useFavouritesService.getFavourites();
      await useTeamsService.getTeamById(route.params.id);
    });

    const handleFavourites = async () => {
      const fav = document.querySelector('.team__header__star');

      const favourites = useFavouritesService.favourites;
      const teams = favourites.teams;
      if (useAuthService.userIsAuthorized) {
        let isFav;

        const setStar = () => {
          fav.setAttribute('src', require('@/assets/icons/star_fill.png'));
          fav.style = 'max-height: 7.2rem';
          isFav = true;
        };

        const unsetStar = () => {
          fav.setAttribute('src', require('@/assets/icons/star.png'));
          fav.style = 'max-height: 7.2rem';
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
    };

    const timerFavourites = setInterval(() => {
      if (team.value) {
        handleFavourites();
        clearInterval(timerFavourites);
      }
    }, 100);

    const goToSquadPage = () => {
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

    const goToTeamGamesPage = () => {
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

    return {
      team,
      useAuthService,
      goToSquadPage,
      goToTeamGamesPage,
    };
  },
  components: { LastGamesComponent, NextGamesComponent },
};
</script>

<styless lang="scss" src="./TeamDetailsView.scss" scoped />
