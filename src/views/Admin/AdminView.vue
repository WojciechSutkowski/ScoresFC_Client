<template>
  <div class="main-container">
    <div v-if="!isAdmin" class="info">
      <p class="info__text">
        You are trying to access wrong content. Admin page is available only for
        admin account.
      </p>
    </div>
    <div v-if="isAdmin">
      <p class="info font-30">ADMIN PANEL</p>
      <ul class="comment__admin__list">
        <li
          class="comment__admin__item"
          v-for="comment in comments"
          :key="comment._id"
        >
          <div class="admin__comment__content">
            <div class="comment__item__info">
              <p>Author: {{ comment.username }}</p>
              <p>{{ comment.date }}</p>
            </div>
            <p class="comment__item__content">{{ comment.comment }}</p>
          </div>
          <button
            class="comment__delete__button button"
            @click="handleDelete(comment.id)"
          >
            DELETE
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, computed } from 'vue';
import { useAdmin, useAuth } from '@/store';
export default {
  setup() {
    const useAdminService = useAdmin();
    const useAuthService = useAuth();

    const isAdmin = computed(() => useAuthService.adminIsAuthorized);
    const comments = computed(() => useAdminService.comments);

    onBeforeMount(async () => {
      await useAdminService.getComments();
    });

    const handleDelete = (id) => {
      useAdminService.deleteComment(id);
      location.reload();
    };

    return { isAdmin, comments, handleDelete };
  },
};
</script>

<style lang="scss" src="./AdminView.scss" />
