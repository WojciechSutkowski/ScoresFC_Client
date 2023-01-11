<template>
  <div class="main-container league font-36">
    <standings-widget
      class="center widget-80"
      :data-league="route.params.id"
      :data-season="route.params.season"
    ></standings-widget>
  </div>
</template>

<script>
import StandingsWidget from '@/widgets/Standings/StandingsWidget.vue';
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();

    return {
      route,
    };
  },
  beforeRouteEnter(to, from) {
    if (
      to.path !== from.path &&
      to.name === 'League standings' &&
      (from.path !== '/' || from.name === 'Home')
    ) {
      console.log(from);
      window.location.replace(to.path);
    }
  },
  beforeRouteUpdate(to, from) {
    if (to.path !== from.path && to.name === 'League standings') {
      window.location.replace(to.path);
    }
  },
  components: {
    StandingsWidget,
  },
};
</script>
