export default {
  namespaced: true,
  state: {
    userIsAuthorized: false,
    adminIsAuthorized: false,
  },
  getters: {
    data: (state) => state.data,
  },
  actions: {},
  mutations: {
    setUserIsAuthenticated(state, replacement) {
      state.userIsAuthorized = replacement;
    },
    setAdminIsAuthenticated(state, replacement) {
      state.adminIsAuthorized = replacement;
    },
  },
};
