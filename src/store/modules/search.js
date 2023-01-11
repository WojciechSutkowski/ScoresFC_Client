import axios from 'axios';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

export const useSearch = defineStore('search', {
  state: () => ({
    teams: {},
    leagues: {},
  }),
  actions: {
    async getTeams() {
      try {
        const route = useRoute();

        const params = {
          search: route.params.input,
        };

        const res = await axios.get(
          `http://localhost:5000/search/team/${params.search}`
        );

        let replacement = [];

        for (let i = 0; i < res.data.length; i++) {
          replacement[i] = {
            team: res.data[i].team,
            venue: res.data[i].venue,
          };
        }

        this.teams = replacement;
      } catch (err) {
        console.log(err);
      }
    },
    async getLeagues() {
      try {
        const route = useRoute();

        const params = {
          search: route.params.input,
        };

        const res = await axios.get(
          `http://localhost:5000/search/league/${params.search}`
        );

        let replacement = [];

        for (let i = 0; i < res.data.length; i++) {
          replacement[i] = {
            country: res.data[i].country,
            league: res.data[i].league,
            seasons: res.data[i].seasons,
          };
        }

        this.leagues = replacement;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
