import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import AuthStore from "./store/AuthStore";

createApp(App).use(router).use(AuthStore).mount("#app");
