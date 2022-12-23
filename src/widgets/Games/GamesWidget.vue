<template>
  <div
    id="wg-api-football-games"
    data-host="v3.football.api-sports.io"
    :data-key="key"
    data-date=""
    data-league=""
    data-season=""
    data-theme="grey"
    data-refresh="600"
    data-show-toolbar="false"
    data-show-errors="false"
    data-show-logos="true"
    data-modal-game="true"
    data-modal-standings="true"
    data-modal-show-logos="true"
  ></div>
  <!-- <div
    id="wg-api-football-games"
    data-host="v3.football.api-sports.io"
    data-date="2022-12-14"
    data-league=""
    data-season=""
    data-theme="grey"
    data-refresh="600"
    data-show-toolbar="false"
    data-show-errors="false"
    data-show-logos="true"
    data-modal-game="true"
    data-modal-standings="true"
    data-modal-show-logos="true"
    class="center widget-80"
    data-v-7ab20b76=""
  /> -->
</template>

<script>
import {
  ref,
  onMounted,
  // onBeforeMount, getCurrentInstance
} from 'vue';
// import store from '@/store/index';
// import { useStore } from 'vuex';
import axios from 'axios';
import router from '@/router';
import { useFavourites, useAuth } from '@/store';
export default {
  setup() {
    const key = ref(process.env.VUE_APP_API_KEY);
    const useFavouritesService = useFavourites();
    const useAuthService = useAuth();
    // const store = useStore();

    function moveRows(leagueId) {
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
    }

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
            setTimeout(() => {
              location.reload();
            }, 500);
          });
        });
      } else {
        console.log('League!!!');
      }
    }

    // onBeforeMount(() => {
    //   console.log('log');
    //   const current = getCurrentInstance();
    //   current.proxy.$forceUpdate();
    // });

    setTimeout(
      onMounted(async () => {
        const rows = document.querySelectorAll('tr');

        const favourites = useFavouritesService.favourites;
        const { games, leagues } = favourites;

        // Details button change
        const details = document.querySelectorAll('span[class*="wg_info"]');

        details.forEach(function (el) {
          el.innerHTML = 'Modal';
          el.style.width = '50px';
        });

        rows.forEach(function (el) {
          if (el.id.startsWith('football-game')) {
            goToMatchPage(el);
          }
        });

        if (useAuthService.userIsAuthorized) {
          useFavouritesService.getFavourites();
          // console.log(store.getters.favourites);

          // MOVE FAVOURITES ON TOP
          // Get favourites from database

          rows.forEach(function (el) {
            // Add button to every table row
            const btn = document.createElement('td');
            btn.setAttribute('width', '24px');
            const star = document.createElement('img');
            btn.appendChild(star);

            let isFav;

            if (leagues.includes(el.id)) {
              moveRows(el.id);
            }

            if (leagues.includes(el.id) || games.includes(el.id)) {
              star.setAttribute('src', require('@/assets/icons/star_fill.png'));
              star.style = 'width: 2rem';
              isFav = true;
            } else {
              star.setAttribute('src', require('@/assets/icons/star.png'));
              star.style = 'width: 2rem';
              isFav = false;
            }

            btn.onclick = function () {
              if (el.id.startsWith('football-league')) {
                const params = {
                  username: localStorage.getItem('username'),
                  leagueId: el.id,
                };
                console.log(params);
                // Add league ID to database
                if (isFav) {
                  axios
                    .delete('http://localhost:5000/users/favourite-leagues', {
                      params,
                    })
                    .then(
                      (res) => {
                        if (res.status == '200') {
                          console.log(`Removed league ID ${params.leagueId}`);
                        }
                      },
                      (err) => {
                        console.log(err.response);
                      }
                    );
                  star.setAttribute('src', require('@/assets/icons/star.png'));
                  star.style = 'width: 2rem';
                  isFav = false;
                  // Move league to the top
                } else {
                  axios
                    .post(
                      'http://localhost:5000/users/favourite-leagues',
                      params
                    )
                    .then(
                      (res) => {
                        if (res.status == '200') {
                          console.log(`Added league ID ${params.leagueId}`);
                        }
                      },
                      (err) => {
                        console.log(err.response);
                      }
                    );
                  star.setAttribute(
                    'src',
                    require('@/assets/icons/star_fill.png')
                  );
                  star.style = 'width: 2rem';
                  isFav = true;
                  // Move league to the top
                  moveRows(el.id);
                }
              } else if (el.id.startsWith('football-game')) {
                const params = {
                  username: localStorage.getItem('username'),
                  gameId: el.id,
                };
                // Add game ID to database
                if (isFav) {
                  axios
                    .delete('http://localhost:5000/users/favourite-games', {
                      params,
                    })
                    .then(
                      (res) => {
                        if (res.status == '200') {
                          console.log(`Removed game ID ${params.gameId}`);
                        }
                      },
                      (err) => {
                        console.log(err.response);
                      }
                    );
                  star.setAttribute('src', require('@/assets/icons/star.png'));
                  star.style = 'width: 2rem';
                  isFav = false;
                } else {
                  axios
                    .post('http://localhost:5000/users/favourite-games', params)
                    .then(
                      (res) => {
                        if (res.status == '200') {
                          console.log(`Added game ID ${params.gameId}`);
                        }
                      },
                      (err) => {
                        console.log(err.response);
                      }
                    );
                  star.setAttribute(
                    'src',
                    require('@/assets/icons/star_fill.png')
                  );
                  star.style = 'width: 2rem';
                  isFav = true;
                }
                console.log(isFav);
              }
            };
            el.insertBefore(btn, el.firstChild);
          });
        }
      }),
      1000
    );

    return {
      key,
    };
  },
};
</script>

<style lang="scss" src="./GamesWidget.scss" scoped />
