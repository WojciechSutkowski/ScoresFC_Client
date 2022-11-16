<template>
  <button @click="moveRows">XD</button>
  <button @click="addFavBtn">XD2</button>
  <div
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
  ></div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const key = ref(process.env.VUE_APP_API_KEY);

    // const rows = document.querySelectorAll("tr");
    // console.log(rows);

    // rows.forEach(function (el) {
    //   const btn = document.createElement("button");
    //   btn.innerHTML = "Add";
    //   btn.onclick = function () {
    //     alert("Added to favs");
    //   };
    //   el.appendChild(btn);
    // });

    function addFavBtn(e) {
      e.preventDefault();
      const rows = document.querySelectorAll("tr");
      console.log(rows);

      rows.forEach(function (el) {
        const btn = document.createElement("button");
        btn.innerHTML = "Add";
        btn.onclick = function () {
          alert("Added to favs");
        };
        el.insertBefore(btn, el.firstChild);
      });
    }

    function moveRows(e) {
      e.preventDefault();

      const rows = document.querySelector("table").rows,
        parent = rows[0].parentNode;

      const ourRow = document.querySelector("#football-game-970194");

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
