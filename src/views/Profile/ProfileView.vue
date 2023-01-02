<template>
  <div class="main-container" style="font-size: 4rem">
    <div class="info">
      <p>{{ username }}</p>
    </div>
    <p v-if="!isAdmin" class="info info__text">
      This is user account. You can add your favourites games, leagues or teams
      to favourites and add comments at games pages.
    </p>
    <p v-if="isAdmin" class="info info__text">
      This is admin account. You can go to admin panel from the footer of the
      page or straight at /admin route. There, you can delete comments.
    </p>

    <button
      class="button__light"
      v-if="!isAdmin"
      @click="handleDeleteAccount()"
    >
      Delete account
    </button>
  </div>
</template>

<script>
import { useAuth } from '@/store';
import { computed } from 'vue';
export default {
  setup() {
    const useAuthService = useAuth();
    const token = localStorage.getItem('token');
    const parsedToken = JSON.parse(token);
    const username = parsedToken.token.username;

    const isAdmin = computed(() => useAuthService.adminIsAuthorized);

    const handleDeleteAccount = () => {
      console.log('deleted');
    };

    return { username, handleDeleteAccount, isAdmin };
  },
};
</script>

<style lang="scss"></style>
