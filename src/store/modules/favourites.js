import axios from 'axios';

export default {
  namespaced: true,
  state: {
    favourites: {},
  },
  getters: {
    favourites(state) {
      return state.favourites;
    },
  },
  actions: {
    async getFavourites(context) {
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
        context.commit('setFavourites', replacement);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mutations: {
    setFavourites(state, replacement) {
      state.favourites = replacement;
    },
  },
};
