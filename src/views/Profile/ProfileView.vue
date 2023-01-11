<template>
  <div class="main-container font-36">
    <div class="info">
      <p>{{ username }}</p>
    </div>
    <p v-if="!isAdmin" class="info info__text font-30">
      This is user account. You can add your favourites games, leagues or teams
      to favourites and add comments at games pages.
    </p>
    <p v-if="isAdmin" class="info info__text font-30">
      This is admin account. You can go to admin panel from the footer of the
      page or straight at /admin route. There, you can delete comments.
    </p>

    <button
      class="button button__light"
      v-if="!isAdmin"
      @click="handleDeleteAccount()"
    >
      Delete account
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { computed } from 'vue';
import { useAuth } from '@/store';
import router from '@/router';
import { useToast } from 'vue-toastification';
export default {
  setup() {
    const useAuthService = useAuth();
    const token = localStorage.getItem('token');
    const parsedToken = JSON.parse(token);
    const username = parsedToken.token.username;
    const toast = useToast();

    const isAdmin = computed(() => useAuthService.adminIsAuthorized);

    const handleDeleteAccount = () => {
      console.log('deleted');

      const params = {
        username: username,
      };

      axios.delete('http://localhost:5000/users/delete', { params }).then(
        (res) => {
          if (res.status == '200') {
            toast.success('Account deleted correctly', {
              toastClassName: 'custom_toast',
              timeout: 2000,
            });

            localStorage.clear();
            router.push({ path: '/' });
          }
        },
        (err) => {
          console.log(err.response);
          toast.error('Unexpected error', {
            toastClassName: 'custom_toast',
            timeout: 2000,
          });
        }
      );
    };

    return { username, handleDeleteAccount, isAdmin };
  },
};
</script>
