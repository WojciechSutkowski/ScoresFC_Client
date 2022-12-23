import { useRoute } from 'vue-router';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useLeagues = defineStore('leagues', {
  state: () => ({
    league: {},
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
  },
});
