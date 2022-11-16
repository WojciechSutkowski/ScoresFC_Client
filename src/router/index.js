import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/HomeView.vue";
import SignIn from "../views/SignIn/SignInView.vue";
import SignUp from "../views/SignUp/SignUpView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signin",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: SignUp,
  },
  // {
  //   path: "/profile",
  //   name: "Profile",
  //   component: Profile,
  //   meta: { requiresAuth: true },
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let authCheck = true;
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
