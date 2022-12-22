<template>
  <div
    id="wg-api-football-standings"
    data-host="v3.football.api-sports.io"
    :data-key="key"
    data-league=""
    data-team=""
    data-season=""
    data-theme=""
    data-show-errors="false"
    data-show-logos="true"
    class="wg_loader"
  ></div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const key = ref(process.env.VUE_APP_API_KEY);
    return { key };
  },
};
</script>

<style lang="scss" src="./StandingsWidget.scss" scoped />
