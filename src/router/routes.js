import Home from '../views/Home/HomeView.vue';
import NotFound from '../views/NotFound/NotFoundView.vue';
import Login from '../views/Login/LoginView.vue';
import Register from '../views/Register/RegisterView.vue';
import SearchResults from '../views/Search/SearchResultsView.vue';
import Admin from '../views/Admin/AdminView.vue';
import Profile from '../views/Profile/ProfileView.vue';
import Favourites from '../views/Favourites/FavouritesView.vue';
import LeagueSeasons from '../views/Leagues/LeagueSeasons/LeagueSeasonsView.vue';
import LeagueDetails from '../views/Leagues/LeagueDetails/LeagueDetailsView.vue';
import CountryLeagues from '../views/Leagues/CountryLeagues/CountryLeaguesView.vue';
import TeamDetails from '../views/Team/Details/TeamDetailsView.vue';
import TeamSquad from '../views/Team/Squad/TeamSquadView.vue';
import TeamGames from '../views/Team/Games/TeamGamesView.vue';
import GameDetails from '../views/Game/GameView.vue';
import PlayerDetails from '../views/Player/PlayerDetailsView.vue';
import LeagueGames from '../views/Leagues/LeagueGames/LeagueGamesView.vue';

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
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/login-admin',
    name: 'Login admin',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/search/:type/:input',
    name: 'Search results',
    component: SearchResults,
    props: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true },
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: Favourites,
    meta: { requiresAuth: true },
  },
  {
    path: '/league/seasons/:country/:name',
    name: 'League seasons',
    component: LeagueSeasons,
    props: true,
  },
  {
    path: '/league/:id/:season/games/:type',
    name: 'League games',
    component: LeagueGames,
    props: true,
  },
  {
    path: '/league/:country/:name/:season?',
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
    path: '/team/:id',
    name: 'Team details',
    component: TeamDetails,
    props: true,
  },
  {
    path: '/team/:id/squad',
    name: 'Team squad',
    component: TeamSquad,
    props: true,
  },
  {
    path: '/team/:id/games',
    name: 'Team games',
    component: TeamGames,
    props: true,
  },
  {
    path: '/fixture/:id',
    name: 'Match details',
    component: GameDetails,
  },
  {
    path: '/player/:id',
    name: 'Player details',
    component: PlayerDetails,
    props: true,
  },
];
