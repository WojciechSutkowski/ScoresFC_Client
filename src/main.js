import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(Toast).mount('#app');
