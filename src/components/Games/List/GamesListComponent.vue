<template>
  <button @click="moveRows">XD</button>
  <button @click="addFavBtn">XD2</button>
  <!-- <div
    id="wg-api-football-games"
    data-host="v3.football.api-sports.io"
    :data-key="key"
    data-date=""
    data-league=""
    data-season=""
    data-theme="dark"
    data-refresh="600"
    data-show-toolbar="true"
    data-show-errors="false"
    data-show-logos="true"
    data-modal-game="true"
    data-modal-standings="true"
    data-modal-show-logos="true"
  ></div> -->
  <div class="container">
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
import { ref } from "vue";
export default {
  setup() {
    const key = ref(process.env.VUE_APP_API_KEY);

    function addFavBtn(e) {
      e.preventDefault();
      const rows = document.querySelectorAll("tr");
      console.log(rows);

      rows.forEach(function (el) {
        const btn = document.createElement("button");
        btn.innerHTML = "Add";
        btn.onclick = function () {
          alert("Added to favs");
          console.log(el.id);
        };
        el.insertBefore(btn, el.firstChild);
      });
    }

    function moveRows(e) {
      e.preventDefault();

      const rows = document.querySelector("table").rows,
        parent = rows[0].parentNode;

      const ourRow = document.querySelector("#football-game-1");

      parent.insertBefore(ourRow, rows[0]);

      console.log(rows);
      console.log(ourRow);

      return ourRow;
    }

    return {
      key,
      moveRows,
      addFavBtn,
    };
  },
};
</script>

<style lang="scss" src="./GamesListComponent.scss" scoped />
