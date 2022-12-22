import { createStore } from 'vuex';
import auth from './modules/auth';
import favourites from './modules/favourites';
import leagues from './modules/leagues';

export default createStore({
  modules: {
    auth,
    favourites,
    leagues,
  },
});
