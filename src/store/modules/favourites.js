// import axios from 'axios';
const axios = require('axios');
import { defineStore } from 'pinia';

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
  },
});
