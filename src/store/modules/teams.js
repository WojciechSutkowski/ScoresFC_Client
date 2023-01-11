import axios from 'axios';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

export const useTeams = defineStore('teams', {
  state: () => ({
    teams: {},
    team: false,
  }),
  actions: {
    async getTeams() {
      try {
        const route = useRoute();

        const params = {
          league: route.params.id,
          season: route.params.season,
        };
        const res = await axios.get(
          `http://localhost:5000/team/${params.league}/${params.season}/teams`
        );

        let replacement = [];

        for (let i = 0; i < res.data.length; i++) {
          replacement[i] = {
            team: res.data[i].team,
          };
        }

        this.teams = replacement;
      } catch (err) {
        console.log(err);
      }
    },
    async getTeamById(teamId) {
      try {
        const params = {
          id: teamId,
        };

        const res = await axios.get(`http://localhost:5000/team/${params.id}`);

        const replacement = {
          team: res.data[0].team,
          venue: res.data[0].venue,
        };

        this.team = replacement;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
