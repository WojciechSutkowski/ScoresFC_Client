<template>
  <div class="main-container league font-36">
    <main class="league__container">
      <div class="league__favourites" v-if="useAuthService.userIsAuthorized">
        <img class="league__favourites__star" />
        <p class="font-24">Add to favourites</p>
      </div>
      <div class="league__info">
        <img
          class="league__info__logo"
          :src="league.league.logo"
          alt="League logo"
        />
        <div class="league__info__names">
          <p>
            {{ league.league.name }}
          </p>
          <div class="league__info__country font-24">
            <img
              class="league__info__country--flag"
              :src="league.country.flag"
              alt="League country flag"
            />
            <p class="league__info__country--name">
              {{ league.country.name }}
            </p>
          </div>
        </div>
        <div class="league__info__season">
          <div class="league__info__season--active font-24">
            <p>Season {{ league.seasons[0].start.slice(0, 4) }}</p>
            <p
              v-if="
                league.seasons[0].start.slice(0, 4) !==
                league.seasons[0].end.slice(0, 4)
              "
            >
              /{{ league.seasons[0].end.slice(0, 4) }}
            </p>
          </div>
          <button class="button button__dark" @click="goToSeasonsList">
            Archive seasons
          </button>
        </div>
      </div>
      <div class="league__submenu">
        <button @click="goToStandingsPage" class="button button__dark">
          Standings
        </button>
        <button @click="goToTeamsList" class="button button__dark">
          Teams
        </button>
        <button @click="goToGamesList('finished')" class="button button__dark">
          Finished
        </button>
        <button @click="goToGamesList('live')" class="button button__dark">
          Live
        </button>
        <button
          @click="goToGamesList('not-started')"
          class="button button__dark"
        >
          Not started
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import { onBeforeMount, onUpdated, computed } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { useAuth, useFavourites, useLeagues } from '@/store';
export default {
  setup() {
    const route = useRoute();
    const useAuthService = useAuth();
    const useFavouritesService = useFavourites();
    const useLeagueService = useLeagues();
    let league;

    league = computed(() => useLeagueService.league);

    onBeforeMount(async () => {
      await useFavouritesService.getFavourites();
      await useLeagueService.getLeague();
    });

    const goToSeasonsList = () => {
      const params = {
        id: route.params.id,
      };

      router.push({
        name: 'League seasons',
        params: {
          id: params.id,
        },
      });
    };

    const goToTeamsList = () => {
      const params = {
        id: route.params.id,
        season: route.params.season,
      };

      router.push({
        name: 'League teams',
        params: {
          id: params.id,
          season: params.season,
        },
      });
    };

    const goToGamesList = (type) => {
      const params = {
        leagueId: route.params.id,
        season: route.params.season,
        type: type,
      };

      router.push({
        name: 'League games',
        params: {
          id: params.leagueId,
          season: params.season,
          type: params.type,
        },
      });
    };

    const goToStandingsPage = () => {
      const params = {
        leagueId: route.params.id,
        season: route.params.season,
      };

      router.push({
        name: 'League standings',
        params: {
          id: params.leagueId,
          season: params.season,
        },
      });
    };

    setTimeout(
      onUpdated(async () => {
        const fav = document.querySelector('.league__favourites__star');
        const favourites = useFavouritesService.favourites;
        const leagues = favourites.leagues;
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

          if (leagues.includes(route.params.id)) {
            setStar();
          } else {
            unsetStar();
          }

          fav.onclick = function () {
            if (isFav) {
              useFavouritesService.deleteLeague(route.params.id);
              unsetStar();
            } else {
              useFavouritesService.addLeague(route.params.id);
              setStar();
            }
          };
        }
      }),
      1000
    );

    return {
      route,
      league,
      goToSeasonsList,
      goToTeamsList,
      goToGamesList,
      goToStandingsPage,
      useAuthService,
    };
  },
  beforeRouteEnter(to, from) {
    if (
      to.path !== from.path &&
      to.name === 'League details' &&
      (from.path !== '/' || from.name === 'Home')
    ) {
      window.location.replace(to.path);
    }
  },
  beforeRouteUpdate(to, from) {
    if (to.path !== from.path && to.name === 'League details') {
      window.location.replace(to.path);
    }
  },
};
</script>

<style lang="scss" src="./LeagueDetailsView.scss" scoped />
