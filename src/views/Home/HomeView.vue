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

    <!-- <component :is="HeaderComponent" /> -->

    <!-- <games-widget-component
      class="center widget-80"
      :data-date="date"
    ></games-widget-component> -->
  </main>
</template>

<script>
// import GamesWidgetComponent from '@/widgets/Games/GamesWidgetComponent.vue';
import Datepicker from '@vuepic/vue-datepicker';
import router from '@/router';
import { useRoute } from 'vue-router';
import {
  ref,
  // , onBeforeMount, getCurrentInstance
} from 'vue';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  setup() {
    const route = useRoute();
    const date = ref(route.params.date);

    // onBeforeMount(() => {
    //   // console.log("home ");
    //   const current = getCurrentInstance();
    //   // console.log(current);
    //   current.proxy.$forceUpdate();
    // });

    const format = (date) => {
      let day;
      if (date.getDate().toString().length === 1) {
        day = '0' + date.getDate();
        console.log(day);
      } else {
        day = date.getDate();
      }

      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${year}-${month}-${day}`;
    };

    const handleDate = (date) => {
      console.log(format(date));
      router.push({
        name: 'Home',
        params: { date: format(date), format: format(date) },
      });
      setTimeout(() => {
        location.reload();
      }, 500);
    };

    return { date, format, handleDate, route };
  },
  components: {
    // GamesWidgetComponent,
    Datepicker,
  },
  beforeRouteEnter(to, from) {
    console.log(to);
    console.log(from);
    if (to.name === 'Home' && to.path !== from.path) {
      window.location = to.path;
    }
  },
};
</script>

<style lang="scss" src="./HomeView.scss" />
