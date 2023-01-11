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
        const token = localStorage.getItem('token');
        const parsedToken = JSON.parse(token);
        const bearer = parsedToken.token.bearer;
        const username = parsedToken.token.username;

        const params = {
          username: username,
        };
        const headers = { Authorization: bearer };

        const res = await axios.post(
          'http://localhost:5000/users/favourites',
          { params },
          {
            headers,
          }
        );

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
        const token = localStorage.getItem('token');
        const parsedToken = JSON.parse(token);
        const username = parsedToken.token.username;

        const params = {
          username: username,
          gameId: gameId,
        };

        await axios.post('http://localhost:5000/users/favourite-games', params);

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
        const token = localStorage.getItem('token');
        const parsedToken = JSON.parse(token);
        const username = parsedToken.token.username;

        const params = {
          username: username,
          gameId: gameId,
        };

        await axios.delete('http://localhost:5000/users/favourite-games', {
          params,
        });

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
        const token = localStorage.getItem('token');
        const parsedToken = JSON.parse(token);
        const username = parsedToken.token.username;

        const params = {
          username: username,
          leagueId: leagueId,
        };

        await axios.post(
          'http://localhost:5000/users/favourite-leagues',
          params
        );

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
        const token = localStorage.getItem('token');
        const parsedToken = JSON.parse(token);
        const username = parsedToken.token.username;

        const params = {
          username: username,
          leagueId: leagueId,
        };

        await axios.delete('http://localhost:5000/users/favourite-leagues', {
          params,
        });

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
        const token = localStorage.getItem('token');
        const parsedToken = JSON.parse(token);
        const username = parsedToken.token.username;

        const params = {
          username: username,
          teamId: teamId,
        };

        await axios.post('http://localhost:5000/users/favourite-teams', params);

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
        const token = localStorage.getItem('token');
        const parsedToken = JSON.parse(token);
        const username = parsedToken.token.username;

        const params = {
          username: username,
          teamId: teamId,
        };

        await axios.delete('http://localhost:5000/users/favourite-teams', {
          params,
        });

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
