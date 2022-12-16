import Home from '../views/Home/HomeView.vue';
import SignIn from '../views/SignIn/SignInView.vue';
import SignUp from '../views/SignUp/SignUpView.vue';
import Profile from '../views/Profile/ProfileView.vue';
import LeagueSeasons from '../views/Leagues/LeagueSeasons.vue';
import LeagueDetails from '../views/Leagues/LeagueDetails.vue';
import CountryLeagues from '../views/Leagues/CountryLeagues.vue';
import NotFound from '../views/NotFound/NotFoundView.vue';
import GameDetails from '../views/Games/GameDetails.vue';

export const routes = [
  {
    path: '/:date?',
    name: 'Home',
    component: Home,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not found',
    component: NotFound,
  },
  {
    path: '/signin',
    name: 'Sign In',
    component: SignIn,
  },
  {
    path: '/signin-admin',
    name: 'Admin Sign In',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: SignUp,
  },
  {
    path: '/fixture/:id',
    name: 'Match details',
    component: GameDetails,
  },
  {
    path: '/league/seasons/:id',
    name: 'League seasons',
    component: LeagueSeasons,
    props: true,
  },
  {
    path: '/league/:country/:name',
    name: 'League details',
    component: LeagueDetails,
    props: true,
  },
  {
    path: '/:country/leagues',
    name: 'Country leagues',
    component: CountryLeagues,
    props: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
];
