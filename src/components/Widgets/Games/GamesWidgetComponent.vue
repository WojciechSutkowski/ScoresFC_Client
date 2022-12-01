<template>
  <!-- <div
    id="wg-api-football-games"
    data-host="v3.football.api-sports.io"
    :data-key="key"
    data-date=""
    data-league=""
    data-season=""
    data-theme="dark"
    data-refresh="600"
    data-show-toolbar="false"
    data-show-errors="false"
    data-show-logos="true"
    data-modal-game="true"
    data-modal-standings="true"
    data-modal-show-logos="true"
  ></div> -->
  <div class="center test">
    <table>
      <body>
        <tr id="football-league-1" class="row league">
          <td>League 1</td>
        </tr>
        <tr id="football-game-1" class="football-league-1 row" data-league="1">
          <td>Match 1 (League 1)</td>
        </tr>
        <tr id="football-league-2" class="row league">
          <td>League 2</td>
        </tr>
        <tr id="football-game-2" class="football-league-2 row" data-league="2">
          <td>Match 2 (League 2)</td>
        </tr>
        <tr id="football-game-3" class="football-league-2 row" data-league="2">
          <td>Match 3 (League 2)</td>
        </tr>
        <tr id="football-league-3" class="row league">
          <td>League 3</td>
        </tr>
        <tr id="football-game-4" class="football-league-3 row" data-league="3">
          <td>Match 4 (League 3)</td>
        </tr>
        <tr id="football-game-5" class="football-league-3 row" data-league="3">
          <td>Match 5 (League 3)</td>
        </tr>
        <tr id="football-game-6" class="football-league-3 row" data-league="3">
          <td>Match 6 (League 3)</td>
        </tr>
      </body>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Store from "@/store/Store";
import { useStore } from "vuex";
import axios from "axios";
import router from "@/router";
export default {
  setup() {
    const key = ref(process.env.VUE_APP_API_KEY);
    const store = useStore();

    function moveRows(leagueId) {
      const rows = document.querySelector("table").rows,
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
      if (row.id.startsWith("football-game")) {
        const cells = row.querySelectorAll("td:not(:last-child)");
        cells.forEach(function (el) {
          el.style.cursor = "pointer";
          el.addEventListener("click", () => {
            console.log(row.id);
            router.push({
              name: "Match details",
              params: { id: `${row.id.slice(14)}` },
            });
          });
        });
      } else {
        console.log("League!!!");
      }
    }

    setTimeout(
      onMounted(async () => {
        const rows = document.querySelectorAll("tr");

        // Details button change
        const details = document.querySelectorAll('span[class*="wg_info"]');

        details.forEach(function (el) {
          el.innerHTML = "Modal";
          el.style.width = "50px";
        });

        rows.forEach(function (el) {
          if (el.id.startsWith("football-game")) {
            goToMatchPage(el);
          }
        });

        if (Store.state.userIsAuthorized) {
          store.dispatch("getFavourites");
          // console.log(store.getters.favourites);

          // MOVE FAVOURITES ON TOP
          // Get favourites from database

          rows.forEach(function (el) {
            // Add button to every table row
            const btn = document.createElement("button");
            let favourites = store.getters.favourites;
            const { games, leagues } = favourites;

            let isFav;

            if (leagues.includes(el.id)) {
              moveRows(el.id);
            }

            if (leagues.includes(el.id) || games.includes(el.id)) {
              btn.innerHTML = "Remove";
              isFav = true;
            } else {
              btn.innerHTML = "Add";
              isFav = false;
            }

            btn.onclick = function () {
              if (el.id.startsWith("football-league")) {
                const params = {
                  username: localStorage.getItem("username"),
                  leagueId: el.id,
                };
                console.log(params);
                // Add league ID to database
                if (isFav) {
                  axios
                    .delete("http://localhost:5000/users/favourite-leagues", {
                      params,
                    })
                    .then(
                      (res) => {
                        if (res.status == "200") {
                          console.log(`Removed league ID ${params.leagueId}`);
                        }
                      },
                      (err) => {
                        console.log(err.response);
                      }
                    );
                  isFav = false;
                  btn.innerHTML = "Add";
                  // Move league to the top
                } else {
                  axios
                    .post(
                      "http://localhost:5000/users/favourite-leagues",
                      params
                    )
                    .then(
                      (res) => {
                        if (res.status == "200") {
                          console.log(`Added league ID ${params.leagueId}`);
                        }
                      },
                      (err) => {
                        console.log(err.response);
                      }
                    );
                  isFav = true;
                  btn.innerHTML = "Remove";
                  // Move league to the top
                  moveRows(el.id);
                }
              } else if (el.id.startsWith("football-game")) {
                const params = {
                  username: localStorage.getItem("username"),
                  gameId: el.id,
                };
                // Add game ID to database
                if (isFav) {
                  axios
                    .delete("http://localhost:5000/users/favourite-games", {
                      params,
                    })
                    .then(
                      (res) => {
                        if (res.status == "200") {
                          console.log(`Removed game ID ${params.gameId}`);
                        }
                      },
                      (err) => {
                        console.log(err.response);
                      }
                    );
                  btn.innerHTML = "Add";
                  isFav = false;
                } else {
                  axios
                    .post("http://localhost:5000/users/favourite-games", params)
                    .then(
                      (res) => {
                        if (res.status == "200") {
                          console.log(`Added game ID ${params.gameId}`);
                        }
                      },
                      (err) => {
                        console.log(err.response);
                      }
                    );
                  isFav = true;
                  btn.innerHTML = "Remove";
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

<style lang="scss" src="./GamesWidgetComponent.scss" scoped />
