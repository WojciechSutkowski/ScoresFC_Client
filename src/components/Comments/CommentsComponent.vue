<template>
  <div class="comment center">
    <div class="comment__login info font-24" v-if="!isAuthorized">
      <p>Login to add comment</p>
    </div>
    <div class="comment__new" v-if="isAuthorized">
      <textarea
        maxlength="400"
        class="comment__new__input"
        type="text"
        placeholder="Add new comment"
        v-model="comment"
        required
      />
      <button
        class="button button__light"
        type="primary"
        @click="handleComment"
      >
        Add
      </button>
    </div>
    <div class="comment__added">
      <ul class="comment__added__list">
        <li
          class="comment__added__item"
          v-for="comment in comments"
          :key="comment.date"
        >
          <div class="comment__item">
            <div class="comment__item__info">
              <p>Author: {{ comment.username }}</p>
              <p>{{ comment.date }}</p>
            </div>
            <p class="comment__item__content">{{ comment.comment }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth, useComments } from '@/store';
export default {
  setup() {
    const comment = ref('');
    const route = useRoute();
    const useAuthService = useAuth();
    const useCommentsService = useComments();

    const isAuthorized = computed(() => useAuthService.userIsAuthorized);
    const comments = computed(() => useCommentsService.comments);

    onBeforeMount(async () => {
      await useCommentsService.getComments();
    });

    const handleComment = (e) => {
      e.preventDefault();

      useCommentsService.setComment(comment.value, route);
      location.reload();
    };

    return { comment, comments, isAuthorized, handleComment };
  },
};
</script>

<style lang="scss" src="./CommentsComponent.scss" />
