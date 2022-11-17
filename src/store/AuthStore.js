import { createStore } from "vuex";

export default createStore({
  state: {
    userIsAuthorized: false,
  },
  mutations: {
    setUserIsAuthenticated(state, replacement) {
      state.userIsAuthorized = replacement;
    },
  },
  actions: {},
  getters: {},
});
