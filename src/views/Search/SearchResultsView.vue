<template>
  <div class="main-container">
    <div v-if="searchType === 'league'">
      <ul v-for="league in leagues" :key="league.name">
        <li @click="goToLeaguePage(league.country, league.name)">
          {{ league.name }}
        </li>
      </ul>
    </div>
    <div v-if="searchType === 'team'">
      <ul v-for="team in teams" :key="team.name">
        <li @click="goToTeamPage(team.id)">
          {{ team.name }}
        </li>
      </ul>
    </div>
    <!-- <div>
      {{ mockLeague }}
    </div> -->
    <!-- <div>
      {{ mockTeam }}
    </div> -->
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';
import { reactive, toRefs, ref } from 'vue';
export default {
  setup() {
    const route = useRoute();

    const state = reactive({
      leagues: [],
      teams: [],
    });

    const type = route.params.type;

    const searchType = ref(type);

    const search = localStorage.getItem('search');
    console.log(search);

    const params = {
      search: search,
    };

    if (type === 'league') {
      axios.get(`http://localhost:5000/search/league/${params.search}`).then(
        (res) => {
          if (res.status == '200') {
            console.log(res.data);
            for (let i = 0; i < res.data.length; i++) {
              state.leagues[i] = {
                leagueName: res.data[i].league.name,
              };
            }
            console.log(state.leagues);
          }
        },
        (err) => {
          console.log(err.response);
        }
      );
    } else if (type === 'team') {
      axios.get(`http://localhost:5000/search/team/${params.search}`).then(
        (res) => {
          if (res.status == '200') {
            console.log(res.data);
            for (let i = 0; i < res.data.length; i++) {
              state.teams[i] = {
                teamName: res.data[i].team.name,
              };
            }
          }
        },
        (err) => {
          console.log(err.response);
        }
      );
    }

    function goToTeamPage(teamId) {
      const params = {
        id: teamId,
      };

      route.push({
        name: 'Team details',
        params: {
          id: params.id,
        },
      });
    }

    function goToLeaguePage(leagueCountry, leagueName) {
      const params = {
        country: leagueCountry,
        league: leagueName,
      };

      route.push({
        name: 'League details',
        params: {
          country: params.country,
          name: params.league,
          current: true,
        },
      });
    }

    const { leagues, teams } = toRefs(state);

    return {
      // mockLeague, mockTeam
      leagues,
      teams,
      searchType,
      goToTeamPage,
      goToLeaguePage,
    };
  },
};
</script>

<style></style>
