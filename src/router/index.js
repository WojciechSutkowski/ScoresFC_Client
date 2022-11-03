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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
