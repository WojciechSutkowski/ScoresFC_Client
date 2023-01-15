<template>
  <main class="main-container">
    <div class="center game" v-if="useAuthService.userIsAuthorized">
      <div>
        <img class="game__favourites" />
        <p class="font-24">Add to favourites</p>
      </div>
    </div>
    <game-widget class="center widget-80" :data-id="gameId"></game-widget>
    <comments-component />
  </main>
</template>

<script>
import CommentsComponent from '@/components/Comments/CommentsComponent.vue';
import GameWidget from '@/widgets/Game/GameWidget.vue';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth, useFavourites } from '@/store';

export default {
  setup() {
    const route = useRoute();
    const useAuthService = useAuth();
    const useFavouritesService = useFavourites();
    const gameId = route.params.id;
    let games;

    onBeforeMount(async () => {
      await useFavouritesService.getFavourites();
    });

    const handleFavourites = async () => {
      const fav = document.querySelector('.game__favourites');
      const favourites = useFavouritesService.favourites;
      games = favourites.games;
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

        setTimeout(() => {
          if (games.includes(route.params.id)) {
            setStar();
          } else {
            unsetStar();
          }
        }, 1000);

        fav.onclick = function () {
          if (isFav) {
            useFavouritesService.deleteGame(route.params.id);
            unsetStar();
          } else {
            useFavouritesService.addGame(route.params.id);
            setStar();
          }
        };
      }
    };

    const timerFavourites = setInterval(() => {
      const game = document.querySelectorAll('.wg-api-football-game');
      if (game) {
        handleFavourites();
        clearInterval(timerFavourites);
      }
    }, 100);

    return {
      gameId,
      useAuthService,
    };
  },
  beforeRouteEnter(to, from) {
    if (
      to.path !== from.path &&
      to.name === 'Match details' &&
      (from.path !== '/' || from.name === 'Home')
    ) {
      window.location.replace(to.path);
    }
  },
  beforeRouteUpdate(to, from) {
    if (to.path !== from.path && to.name === 'Match details') {
      window.location.replace(to.path);
    }
  },
  components: {
    CommentsComponent,
    GameWidget,
  },
};
</script>

<style lang="scss" src="./GameView.scss"></style>
