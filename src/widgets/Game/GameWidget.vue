<template>
  <div
    id="wg-api-football-game"
    data-host="v3.football.api-sports.io"
    :data-key="key"
    data-id=""
    data-theme="light"
    data-refresh="15"
    data-show-errors="false"
    data-show-logos="true"
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
