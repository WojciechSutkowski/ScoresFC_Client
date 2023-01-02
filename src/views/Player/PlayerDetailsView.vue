<template>
  <div class="main-container">
    {{ player.player }}
  </div>
</template>

<script>
import { playerDetails } from '@/mocks/playerDetails';
export default {
  setup() {
    const player = playerDetails;

    return { player };
  },
};
</script>

<style></style>
