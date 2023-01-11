<template>
  <main class="main-container">
    <Datepicker
      v-model="date"
      auto-apply
      :enable-time-picker="false"
      :format="format"
      :preview-format="date"
      @update:modelValue="handleDate"
      placeholder="Pick date"
      class="center widget-80"
    />

    <games-widget class="center widget-80" :data-date="date"></games-widget>
  </main>
</template>

<script>
import GamesWidget from '@/widgets/Games/GamesWidget.vue';
import { ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { format } from '@/utils/format';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  setup() {
    const route = useRoute();
    const date = ref(route.params.date);

    const handleDate = (date) => {
      router.push({
        name: 'Home',
        params: { date: format(date), format: format(date) },
      });
    };

    return { date, route, handleDate, format };
  },
  beforeRouteEnter(to, from) {
    if (to.path !== from.path && to.name === 'Home' && from.path !== '/') {
      window.location.replace(to.path);
    }
  },
  beforeRouteUpdate(to, from) {
    if (to.path !== from.path && to.name === 'Home') {
      window.location.replace(to.path);
    }
  },
  components: {
    GamesWidget,
    Datepicker,
  },
};
</script>

<style lang="scss" src="./HomeView.scss" />
