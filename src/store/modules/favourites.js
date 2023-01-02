import axios from 'axios';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';

export const useFavourites = defineStore('favourites', {
  state: () => ({
    favourites: false,
  }),
  actions: {
    async getFavourites() {
      try {
        const params = {
          username: localStorage.getItem('username'),
        };
        const res = await axios.get('http://localhost:5000/users/favourites', {
          params,
        });
        const replacement = {
          leagues: res.data.favouriteLeagues,
          games: res.data.favouriteGames,
          teams: res.data.favouriteTeams,
        };
        this.favourites = replacement;
      } catch (err) {
        console.log(err);
      }
    },
    async addGame(gameId) {
      const toast = useToast();
      try {
        const params = {
          username: localStorage.getItem('username'),
          gameId: gameId,
        };
        await axios.post('http://localhost:5000/users/favourite-games', params);
        console.log(`Added game ID ${params.gameId}`);
        toast.success('Added to favourites', {
          toastClassName: 'custom_toast',
          timeout: 2000,
        });
      } catch (err) {
        console.log(err);
        toast.error('Error while removing from favourites', {
          toastClassName: 'custom_toast',
          timeout: 2000,
        });
      }
    },
    async deleteGame(gameId) {
      const toast = useToast();
      try {
        const params = {
          username: localStorage.getItem('username'),
          gameId: gameId,
        };
        await axios.delete('http://localhost:5000/users/favourite-games', {
          params,
        });
        console.log(`Removed game ID ${params.gameId}`);
        toast.success('Removed from favourites', {
          toastClassName: 'custom_toast',
          timeout: 2000,
        });
      } catch (err) {
        console.log(err);
        toast.error('Error while removing from favourites', {
          toastClassName: 'custom_toast',
          timeout: 2000,
        });
      }
    },
    async addLeague(leagueId) {
      const toast = useToast();
      try {
        const params = {
          username: localStorage.getItem('username'),
          leagueId: leagueId,
        };
        await axios.post(
          'http://localhost:5000/users/favourite-leagues',
          params
        );
        console.log(`Added league ID ${params.leagueId}`);
        toast.success('Added to favourites', {
          toastClassName: 'custom_toast',
          timeout: 2000,
        });
      } catch (err) {
        console.log(err);
        toast.error('Error while removing from favourites', {
          toastClassName: 'custom_toast',
          timeout: 2000,
        });
      }
    },
    async deleteLeague(leagueId) {
      const toast = useToast();
      try {
        const params = {
          username: localStorage.getItem('username'),
          leagueId: leagueId,
        };
        await axios.delete('http://localhost:5000/users/favourite-leagues', {
          params,
        });
        console.log(`Removed league ID ${params.leagueId}`);
        toast.success('Removed from favourites', {
          toastClassName: 'custom_toast',
          timeout: 2000,
        });
      } catch (err) {
        console.log(err);
        toast.error('Error while removing from favourites', {
          toastClassName: 'custom_toast',
          timeout: 2000,
        });
      }
    },
    async addTeam(teamId) {
      const toast = useToast();
      try {
        const params = {
          username: localStorage.getItem('username'),
          teamId: teamId,
        };
        await axios.post('http://localhost:5000/users/favourite-teams', params);
        console.log(`Added team ID ${params.teamId}`);
        toast.success('Added to favourites', {
          toastClassName: 'custom_toast',
          timeout: 2000,
        });
      } catch (err) {
        console.log(err);
        toast.error('Error while removing from favourites', {
          toastClassName: 'custom_toast',
          timeout: 2000,
        });
      }
    },
    async deleteTeam(teamId) {
      const toast = useToast();
      try {
        const params = {
          username: localStorage.getItem('username'),
          teamId: teamId,
        };
        await axios.delete('http://localhost:5000/users/favourite-teams', {
          params,
        });
        console.log(`Removed team ID ${params.teamId}`);
        toast.success('Removed from favourites', {
          toastClassName: 'custom_toast',
          timeout: 2000,
        });
      } catch (err) {
        console.log(err);
        toast.error('Error while removing from favourites', {
          toastClassName: 'custom_toast',
          timeout: 2000,
        });
      }
    },
  },
});
