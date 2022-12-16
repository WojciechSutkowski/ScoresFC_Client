<template>
  <div
    class="main-container"
    style="font-size: 4rem"
    v-for="response in headings"
    :key="response"
  >
    <header class="league__header">
      <div class="league__info">
        <img class="league__logo" :src="response.league.logo" />
        <div>
          <p>
            {{ response.league.name }}
          </p>
          <div class="league__country">
            <img class="league__country__flag" :src="response.country.flag" />
            <p class="league__country__name">{{ response.country.name }}</p>
          </div>
        </div>
      </div>
      <div>
        <div class="league__season">
          <p>Season {{ response.seasons.start.slice(0, 4) }}</p>
          <p
            v-if="
              response.seasons.start.slice(0, 4) !==
              response.seasons.end.slice(0, 4)
            "
          >
            /{{ response.seasons.end.slice(0, 4) }}
          </p>
        </div>
        <button>Archive seasons</button>
      </div>
    </header>

    <standings-widget-component
      v-for="season in response.seasons"
      class="center widget-80"
      :key="season"
      :data-league="response.league.id"
      :data-season="season.year"
    ></standings-widget-component>
  </div>
</template>

<script>
import StandingsWidgetComponent from '@/widgets/Standings/StandingsWidgetComponent.vue';
import { useRoute } from 'vue-router';
import { reactive, toRefs } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const route = useRoute();
    console.log(route.params.country);

    const state = reactive({
      headings: [],
    });

    const params = {
      country: route.params.country,
      league: route.params.name,
      current: true,
    };

    console.log(params);

    axios
      .get(`http://localhost:5000/leagues/${params.country}/${params.league}`)
      .then(
        (res) => {
          if (res.status == '200') {
            console.log(res.data);
            for (let i = 0; i < res.data.length; i++) {
              console.log(res.data[i]);
              state.headings[i] = {
                country: res.data[i].country,
                league: res.data[i].league,
                seasons: res.data[i].seasons[i],
              };
              console.log(state.headings[0].seasons);
            }
          }
        },
        (err) => {
          console.log(err.response);
        }
      );

    const { headings } = toRefs(state);
    console.log(JSON.stringify(headings));
    console.log(headings);

    // const mock = [
    //   {
    //     league: {
    //       id: 106,
    //       name: "Ekstraklasa",
    //       type: "League",
    //       logo: "https://media-1.api-sports.io/football/leagues/106.png",
    //     },
    //     country: {
    //       name: "Poland",
    //       code: "PL",
    //       flag: "https://media-2.api-sports.io/flags/pl.svg",
    //     },
    //     seasons: [
    //       {
    //         year: 2022,
    //         start: "2022-07-16",
    //         end: "2023-05-27",
    //         current: true,
    //         coverage: {
    //           fixtures: {
    //             events: true,
    //             lineups: true,
    //             statistics_fixtures: true,
    //             statistics_players: true,
    //           },
    //           standings: true,
    //           players: true,
    //           top_scorers: true,
    //           top_assists: true,
    //           top_cards: true,
    //           injuries: false,
    //           predictions: true,
    //           odds: false,
    //         },
    //       },
    //     ],
    //   },
    // ];

    return {
      headings,
      // mock
    };
  },
  components: {
    StandingsWidgetComponent,
  },
};
</script>

<style lang="scss" src="./LeagueDetails.scss"></style>
