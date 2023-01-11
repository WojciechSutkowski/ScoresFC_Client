import axios from 'axios';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

export const useGame = defineStore('game', {
  state: () => ({
    game: false,
    teamGames: {},
    lastFive: {},
    nextFive: {},
  }),
  actions: {
    async getGameById(gameId) {
      try {
        const params = {
          id: gameId,
        };

        const res = await axios.get(
          `http://localhost:5000/fixtures/${params.id}`,
          {
            params,
          }
        );

        const replacement = {
          fixture: res.data[0].fixture,
          goals: res.data[0].goals,
          league: res.data[0].league,
          score: res.data[0].score,
          teams: res.data[0].teams,
        };

        this.game = replacement;
      } catch (err) {
        console.log(err);
      }
    },
    async getTeamGames(teamId) {
      try {
        const params = {
          id: teamId,
          season: '2022',
        };

        const res = await axios.get(
          `http://localhost:5000/team/${params.id}/games/${params.season}/all`
        );

        let replacement = [];

        for (let i = 0; i < res.data.length; i++) {
          replacement[i] = {
            fixture: res.data[i].fixture,
            league: res.data[i].league,
            teams: res.data[i].teams,
            goals: res.data[i].goals,
            score: res.data[i].score,
          };
        }

        this.teamGames = replacement;
      } catch (err) {
        console.log(err);
      }
    },
    async getLast5Games() {
      const route = useRoute();

      try {
        const params = {
          id: route.params.id,
        };

        const res = await axios.get(
          `http://localhost:5000/team/${params.id}/games/last`
        );

        let replacement = [];

        for (let i = 0; i < res.data.length; i++) {
          replacement[i] = {
            fixture: res.data[i].fixture,
            league: res.data[i].league,
            teams: res.data[i].teams,
            goals: res.data[i].goals,
            score: res.data[i].score,
          };
        }

        this.lastFive = replacement;
      } catch (err) {
        console.log(err);
      }
    },
    async getNext5Games() {
      const route = useRoute();

      try {
        const params = {
          id: route.params.id,
        };

        const res = await axios.get(
          `http://localhost:5000/team/${params.id}/games/next`
        );

        let replacement = [];

        for (let i = 0; i < res.data.length; i++) {
          replacement[i] = {
            fixture: res.data[i].fixture,
            league: res.data[i].league,
            teams: res.data[i].teams,
            goals: res.data[i].goals,
            score: res.data[i].score,
          };
        }

        this.nextFive = replacement;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
