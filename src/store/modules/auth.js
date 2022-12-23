import { defineStore } from 'pinia';

export const useAuth = defineStore('auth', {
  state: () => ({
    userIsAuthorized: false,
    adminIsAuthorized: false,
  }),
  actions: {
    setUserIsAuthenticated(replacement) {
      this.userIsAuthorized = replacement;
    },
    setAdminIsAuthenticated(replacement) {
      this.adminIsAuthorized = replacement;
    },
  },
});
