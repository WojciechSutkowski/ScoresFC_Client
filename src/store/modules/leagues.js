import axios from 'axios';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

export const useLeagues = defineStore('leagues', {
  state: () => ({
    league: {},
    countryLeagues: [],
    seasons: {},
  }),
  actions: {
    async getLeagueById(leagueId) {
      try {
        const params = {
          id: leagueId,
          current: true,
        };

        const res = await axios.get(
          `http://localhost:5000/league/${params.id}`,
          { params }
        );

        const { country, league, seasons } = res.data[0];

        const replacement = {
          country,
          league,
          seasons,
        };

        this.league = replacement;
      } catch (err) {
        console.log(err);
      }
    },
    async getLeague() {
      try {
        const route = useRoute();

        const params = {
          id: route.params.id,
          season: route.params.season,
        };

        const res = await axios.get(
          `http://localhost:5000/league/${params.id}/${params.season}`
        );

        const { country, league, seasons } = res.data[0];

        const replacement = {
          country,
          league,
          seasons,
        };

        this.league = replacement;
      } catch (err) {
        console.log(err);
      }
    },
    async getCountryLeagues() {
      try {
        const route = useRoute();

        const params = {
          country: route.params.country,
        };

        const res = await axios.get(
          `http://localhost:5000/leagues/${params.country}`
        );

        let replacement = [];

        for (let i = 0; i < res.data.length; i++) {
          replacement[i] = {
            leagueId: res.data[i].league.id,
            leagueName: res.data[i].league.name,
            leagueSeasons: res.data[i].seasons,
          };
        }

        this.countryLeagues = replacement;
      } catch (err) {
        console.log(err);
      }
    },
    async getSeasons() {
      try {
        const route = useRoute();

        const params = {
          id: route.params.id,
        };

        const res = await axios.get(
          `http://localhost:5000/league/seasons/${params.id}`
        );

        let replacement = [];

        for (let i = 0; i < res.data.length; i++) {
          replacement[i] = {
            country: res.data[i].country,
            league: res.data[i].league,
            seasons: res.data[i].seasons,
          };
        }

        this.seasons = replacement;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
