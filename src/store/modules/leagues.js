import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  namespaced: true,
  state: {
    league: 'dlaczego kurwa nie działa',
  },
  getters: {
    league(state) {
      console.log(state);
      return state.league;
    },
  },
  actions: {
    async getLeague(context) {
      const route = useRoute();

      try {
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
        context.commit('setLeague', replacement);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mutations: {
    setLeague(state, replacement) {
      state.league = replacement;
    },
  },
};
