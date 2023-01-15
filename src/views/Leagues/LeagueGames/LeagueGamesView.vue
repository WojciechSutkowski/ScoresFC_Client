<template>
  <div class="main-container games">
    <p class="info font-24" v-if="games.length === 0">No games to show</p>
    <ul class="custom__matches">
      <li v-for="game in games" :key="game">
        <div>
          <div class="custom__matches__league" :id="game.league.id">
            <img
              class="custom__matches__league__favourites"
              v-if="useAuthService.userIsAuthorized"
            />
            <p>{{ game.league.country }}:</p>
            <p>
              {{ game.league.name }}
            </p>
          </div>
          <div class="custom__matches__game" :id="game.fixture.id">
            <img
              class="custom__matches__game__favourites"
              v-if="useAuthService.userIsAuthorized"
            />
            <div class="custom__matches__game__state">
              {{ game.fixture.status.short }}
            </div>
            <div
              @click="goToGamePage(game.fixture.id)"
              class="custom__matches__teams"
            >
              <div class="custom__matches__team">
                <img
                  class="custom__matches__team--logo"
                  :src="game.teams.home.logo"
                />
                <div class="custom__matches__team--score">
                  <p>
                    {{ game.teams.home.name }}
                  </p>
                  <p>{{ game.goals.home }}</p>
                </div>
              </div>
              <div class="custom__matches__team">
                <img
                  class="custom__matches__team--logo"
                  :src="game.teams.away.logo"
                />
                <div class="custom__matches__team--score">
                  <p>
                    {{ game.teams.away.name }}
                  </p>
                  <p>{{ game.goals.away }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { onBeforeMount, computed } from 'vue';
import { useAuth, useFavourites, useLeagueGames } from '@/store';
import { goToGamePage } from '@/router/helpers';
export default {
  setup() {
    const useAuthService = useAuth();
    const useFavouritesService = useFavourites();
    const useLeagueGamesService = useLeagueGames();

    const games = computed(() => useLeagueGamesService.games);

    onBeforeMount(async () => {
      await useFavouritesService.getFavourites();
      await useLeagueGamesService.getGames();
    });

    const handleFavourites = async () => {
      const leaguesRows = document.querySelectorAll('.custom__matches__league');
      const gamesRows = document.querySelectorAll('.custom__matches__game');

      const favourites = useFavouritesService.favourites;
      const leagues = favourites.leagues;
      const games = favourites.games;
      if (useAuthService.userIsAuthorized) {
        leaguesRows.forEach(function (el) {
          const fav = el.childNodes[0];
          let isFav;

          const setStar = () => {
            fav.setAttribute('src', require('@/assets/icons/star_fill.png'));
            fav.style = 'max-height: 2rem';

            isFav = true;
          };

          const unsetStar = () => {
            fav.setAttribute('src', require('@/assets/icons/star.png'));
            fav.style = 'max-height: 2rem';
            isFav = false;
          };

          if (leagues.includes(el.id)) {
            setStar();
          } else {
            unsetStar();
          }

          fav.onclick = function () {
            if (isFav) {
              useFavouritesService.deleteLeague(el.id);
              unsetStar();
            } else {
              useFavouritesService.addLeague(el.id);
              setStar();
            }
          };
        });

        gamesRows.forEach(function (el) {
          const fav = el.childNodes[0];
          let isFav;

          const setStar = () => {
            fav.setAttribute('src', require('@/assets/icons/star_fill.png'));
            fav.style = 'max-height: 2rem';
            isFav = true;
          };

          const unsetStar = () => {
            fav.setAttribute('src', require('@/assets/icons/star.png'));
            fav.style = 'max-height: 2rem';
            isFav = false;
          };

          if (games.includes(el.id)) {
            setStar();
          } else {
            unsetStar();
          }

          fav.onclick = function () {
            if (isFav) {
              useFavouritesService.deleteGame(el.id);
              unsetStar();
            } else {
              useFavouritesService.addGame(el.id);
              setStar();
            }
          };
        });
      }
    };

    const timerFavourites = setInterval(() => {
      const list = document.getElementsByClassName('custom__matches');
      if (list.item(0).children.length) {
        handleFavourites();
        clearInterval(timerFavourites);
      }
    }, 100);

    return { games, goToGamePage, useAuthService };
  },
};
</script>
