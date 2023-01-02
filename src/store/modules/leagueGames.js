import axios from 'axios';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

export const useLeagueGames = defineStore('leagueGames', {
  state: () => ({
    games: [],
  }),
  actions: {
    async getGames() {
      try {
        const route = useRoute();
        const params = {
          leagueId: route.params.id,
          season: route.params.season,
          type: route.params.type,
        };

        const res = await axios.get(
          `http://localhost:5000/fixtures/${params.leagueId}/${params.season}/${params.type}`
        );

        let replacement = [];

        for (let i = 0; i < res.data.length; i++) {
          replacement[i] = {
            fixture: res.data[i].fixture,
            goals: res.data[i].goals,
            league: res.data[i].league,
            score: res.data[i].score,
            teams: res.data[i].teams,
          };
        }

        console.log(replacement);

        this.games = replacement;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
