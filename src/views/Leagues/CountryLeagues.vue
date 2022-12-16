<template>
  <div class="main-container" style="font-size: 4rem">
    <p>{{ params.country }}</p>
    <ul v-for="league in leagues" :key="league.leagueName">
      <li @click="goToLeaguePage(league.leagueName)">
        {{ league.leagueName }}
      </li>
    </ul>
    <!-- <p>Poland</p>
    <ul>
      <li @click="goToLeaguePage('Ekstraklasa')">Ekstraklasa</li>
      <li>I Liga</li>
    </ul> -->
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
// import { onUpdated } from "vue";
import axios from 'axios';
import router from '@/router';
import { reactive, toRefs } from 'vue';
export default {
  setup() {
    const route = useRoute();
    // const Leagues = route.params;
    // onUpdated(() => {
    //   window.location.reload();
    // });
    const state = reactive({
      leagues: [],
    });
    const params = {
      country: route.params.country,
    };
    axios.get(`http://localhost:5000/leagues/${params.country}`).then(
      (res) => {
        if (res.status == '200') {
          for (let i = 0; i < res.data.length; i++) {
            console.log(res.data[i].league.name);
            state.leagues[i] = {
              leagueName: res.data[i].league.name,
            };
          }
        }
        // window.location.reload();
      },
      (err) => {
        console.log(err.response);
      }
    );
    const { leagues } = toRefs(state);
    console.log(JSON.stringify(leagues));

    function goToLeaguePage(leagueName) {
      const params = {
        country: route.params.country,
        league: leagueName,
      };

      router.push({
        name: 'League details',
        params: {
          country: params.country,
          name: params.league,
          current: true,
        },
      });

      setTimeout(() => {
        location.reload();
      }, 500);
    }
    // window.location.reload();

    return { leagues, params, goToLeaguePage };
    // return { goToLeaguePage };
  },
};
</script>

<style lang="scss"></style>
