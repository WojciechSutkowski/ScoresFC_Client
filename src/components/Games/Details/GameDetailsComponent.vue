<template>
  <div
    class="container"
    id="wg-api-football-game"
    data-host="v3.football.api-sports.io"
    :data-key="key"
    data-id="718243"
    data-theme=""
    data-refresh="1500"
    data-show-errors="true"
    data-show-logos="true"
  ></div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const key = ref(process.env.VUE_APP_API_KEY);
    return { key };
  },
};
</script>

<style lang="scss" src="./GameDetailsComponent.scss" scoped />
