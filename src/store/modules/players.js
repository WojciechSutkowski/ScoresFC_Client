import axios from 'axios';
import { defineStore } from 'pinia';

export const usePlayers = defineStore('players', {
  state: () => ({
    player: {},
    squad: {},
  }),
  actions: {
    async getPlayerById(playerId) {
      try {
        const params = {
          id: playerId,
          season: '2022',
        };

        const res = await axios.get(
          `http://localhost:5000/player/${params.id}/${params.season}`
        );

        const replacement = {
          player: res.data[0].player,
          statistics: res.data[0].statistics,
        };

        this.player = replacement;
      } catch (err) {
        console.log(err);
      }
    },
    async getTeamSquad(teamId) {
      try {
        const params = {
          team: teamId,
        };

        const res = await axios.get(
          `http://localhost:5000/team/${params.team}/squad`
        );

        const replacement = {
          team: res.data[0].team,
          players: res.data[0].players,
        };

        this.squad = replacement;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
