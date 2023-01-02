import { useRoute } from 'vue-router';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useLeagues = defineStore('leagues', {
  state: () => ({
    league: {},
    countryLeagues: [],
    seasons: {},
  }),
  actions: {
    async getLeague() {
      try {
        const route = useRoute();
        const params = {
          country: route.params.country,
          league: route.params.name,
          current: true,
        };
        const res = await axios.get(
          `http://localhost:5000/league/${params.country}/${params.league}`,
          { params }
        );

        const { country, league, seasons } = res.data[0];

        const replacement = {
          country,
          league,
          seasons,
        };

        console.log(replacement);
        this.league = replacement;
      } catch (err) {
        console.log(err);
      }
    },
    async getPastSeasonLeague() {
      try {
        const route = useRoute();
        const params = {
          country: route.params.country,
          league: route.params.name,
          current: false,
          season: route.params.season,
        };
        const res = await axios.get(
          `http://localhost:5000/league/${params.country}/${params.league}`,
          { params }
        );

        const { country, league, seasons } = res.data[0];

        const replacement = {
          country,
          league,
          seasons,
        };

        console.log(replacement);
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
            leagueName: res.data[i].league.name,
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
        console.log(route.params);
        const params = {
          country: route.params.country,
          league: route.params.name,
          current: false,
        };
        const res = await axios.get(
          `http://localhost:5000/league/${params.country}/${params.league}`,
          { params }
        );

        console.log(res);

        const { country, league, seasons } = res.data[0];

        const replacement = {
          country,
          league,
          seasons,
        };

        console.log(replacement);
        this.seasons = replacement;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
