<template>
  <div
    id="wg-api-football-games"
    data-host="v3.football.api-sports.io"
    :data-key="key"
    data-date=""
    data-league=""
    data-season=""
    data-theme="light"
    data-refresh="600"
    data-show-toolbar="false"
    data-show-errors="false"
    data-show-logos="true"
    data-modal-game="true"
    data-modal-standings="true"
    data-modal-show-logos="true"
  ></div>
</template>

<script>
import { ref, onMounted } from 'vue';
import router from '@/router';
import { useAuth, useFavourites } from '@/store';
import { useToast } from 'vue-toastification';
export default {
  setup() {
    const key = ref(process.env.VUE_APP_API_KEY);
    const useAuthService = useAuth();
    const useFavouritesService = useFavourites();
    const toast = useToast();

    setTimeout(
      onMounted(async () => {
        const rows = document.querySelectorAll('tr');

        const favourites = useFavouritesService.favourites;
        const { games, leagues } = favourites;

        // Details button hide
        const details = document.querySelectorAll('span[class*="wg_info"]');
        details.forEach(function (el) {
          el.style.display = 'none';
        });

        rows.forEach(function (el) {
          if (el.id.startsWith('football-game')) {
            goToMatchPage(el);
          }
        });

        if (useAuthService.userIsAuthorized) {
          useFavouritesService.getFavourites();

          rows.forEach(function (el) {
            // Add button to every table row
            const btn = document.createElement('td');
            const star = document.createElement('img');
            btn.setAttribute('width', '24px');
            btn.setAttribute(
              'style',
              'background-color: #fff; border-bottom: 0'
            );
            btn.appendChild(star);

            let isFav;

            const setStar = (star) => {
              star.setAttribute('src', require('@/assets/icons/star_fill.png'));
              star.style = 'width: 2.4rem';
              isFav = true;
            };

            const unsetStar = (star) => {
              star.setAttribute('src', require('@/assets/icons/star.png'));
              star.style = 'width: 2.4rem';
              isFav = false;
            };

            if (leagues.includes(el.id.slice(16))) {
              moveRows(el.id);
            }

            if (
              leagues.includes(el.id.slice(16)) ||
              games.includes(el.id.slice(14))
            ) {
              setStar(star);
            } else {
              unsetStar(star);
            }

            btn.onclick = function () {
              if (el.id.startsWith('football-league')) {
                if (isFav) {
                  useFavouritesService.deleteLeague(el.id.slice(16));
                  unsetStar(star);
                } else {
                  useFavouritesService.addLeague(el.id.slice(16));
                  setStar(star);
                  moveRows(el.id);
                }
              } else if (el.id.startsWith('football-game')) {
                if (isFav) {
                  useFavouritesService.deleteGame(el.id.slice(14));
                  unsetStar(star);
                } else {
                  useFavouritesService.addGame(el.id.slice(14));
                  setStar(star);
                }
              }
            };
            el.insertBefore(btn, el.firstChild);
          });
        }
      }),
      1000
    );

    const moveRows = (leagueId) => {
      const rows = document.querySelector('table').rows,
        parent = rows[0].parentNode;

      const leagueToMove = document.querySelector(`#${leagueId}`);
      const gamesToMove = document.querySelectorAll(`.${leagueId}`);

      // League to first row
      parent.insertBefore(leagueToMove, rows[0]);

      // Games to go under favourite league
      for (let i = 0; i < gamesToMove.length; i++) {
        parent.insertBefore(gamesToMove[i], rows[i + 1]);
      }
    };

    function goToMatchPage(row) {
      if (row.id.startsWith('football-game')) {
        const cells = row.querySelectorAll('td:not(:last-child)');
        cells.forEach(function (el) {
          el.style.cursor = 'pointer';
          el.addEventListener('click', () => {
            console.log(row.id);
            router.push({
              name: 'Match details',
              params: { id: `${row.id.slice(14)}` },
            });
          });
        });
      } else {
        toast.error('Cannot go to match page', {
          toastClassName: 'custom_toast',
          timeout: 2000,
        });
      }
    }

    return {
      key,
      toast,
    };
  },
};
</script>
