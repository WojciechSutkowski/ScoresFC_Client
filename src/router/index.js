import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/HomeView.vue";
import SignIn from "../views/SignIn/SignInView.vue";
import SignUp from "../views/SignUp/SignUpView.vue";
import Profile from "../views/Profile/ProfileView.vue";
import LeagueSeasons from "../views/Leagues/LeagueSeasons.vue";
import LeagueDetails from "../views/Leagues/LeagueDetails.vue";
import CountryLeagues from "../views/Leagues/CountryLeagues.vue";
import NotFound from "../views/NotFound/NotFoundView.vue";
import GameDetails from "../views/Games/GameDetails.vue";
import Store from "@/store/Store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Not found",
    component: NotFound,
  },
  {
    path: "/signin",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/signin-admin",
    name: "Admin Sign In",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: SignUp,
  },
  {
    path: "/fixture/:id",
    name: "Match details",
    component: GameDetails,
  },
  {
    path: "/league/:id",
    name: "League seasons",
    component: LeagueSeasons,
    props: true,
  },
  {
    path: "/league/:id/:season",
    name: "League details",
    component: LeagueDetails,
    props: true,
  },
  {
    path: "/:country/leagues",
    name: "Country leagues",
    component: CountryLeagues,
    props: true,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Refactor
  let authCheck = null;
  const token = localStorage.getItem("token");
  if (token) {
    const parsedToken = JSON.parse(token);
    authCheck = parsedToken.token.auth;
  }

  // const authCheck = localStorage.getItem("auth");

  if (authCheck) {
    Store.commit("setUserIsAuthenticated", true);
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authCheck) {
      next();
    } else {
      router.replace("/signin");
    }
  } else {
    next();
  }
});

export default router;
