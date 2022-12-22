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

    <games-widget class="center widget-80" :data-date="date"></games-widget>
  </main>
  <button @click="scrollToTop" class="scrollToTop">Top</button>
</template>

<script>
import GamesWidget from '@/widgets/Games/GamesWidget.vue';
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
    console.log(history.state);
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
      router.push({
        name: 'Home',
        params: { date: format(date), format: format(date) },
      });
      // setTimeout(() => {
      //   location.reload();
      // }, 500);
    };

    const scrollBtn = document.getElementsByClassName('scrollToTop');
    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        scrollBtn[0].style.display = 'block';
      } else {
        scrollBtn[0].style.display = 'none';
      }
    }

    window.onscroll = function () {
      scrollFunction();
    };

    // When the user clicks on the button, scroll to the top of the document
    function scrollToTop() {
      console.log('clicked');
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    return { date, format, handleDate, route, scrollToTop };
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
