<template>
  <div class="comment center">
    <div class="comment__login" v-if="!isAuthorized">
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
      <button class="comment__new__btn" type="primary" @click="handleComment">
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
import axios from 'axios';
import { ref, reactive, toRefs, computed } from 'vue';
import { useRoute } from 'vue-router';
// import store from '@/store/index';
import { useAuth } from '@/store';
export default {
  setup() {
    const route = useRoute();
    const comment = ref('');
    const username = ref('');
    const useAuthService = useAuth();

    const isAuthorized = computed(() => useAuthService.userIsAuthorized);

    function handleComment(e) {
      e.preventDefault();

      let params = {
        username: localStorage.getItem('username'),
        gameId: route.params.id,
        comment: comment.value,
      };

      axios.post('http://localhost:5000/comments/create', params).then(
        (res) => {
          if (res.status == '200') {
            console.log('Added correctly');
            location.reload();
          }
        },
        (err) => {
          console.log(err.response);
        }
      );
    }

    const state = reactive({
      comments: [],
    });

    const params = {
      gameId: route.params.id,
    };

    axios.get(`http://localhost:5000/comments/${params.gameId}`).then(
      (res) => {
        if (res.status == '200') {
          for (let i = 0; i < res.data.allComments.length; i++) {
            state.comments[i] = {
              comment: res.data.allComments[i].comment,
              username: res.data.allComments[i].username,
              date: res.data.allComments[i].createdAt
                .replace(/T/, ' ')
                .replace(/\..+/, ''),
            };
          }
          state.comments.reverse();
          console.log(state.comments);
        }
      },
      (err) => {
        console.log(err.response);
      }
    );

    const { comments } = toRefs(state);
    console.log(comments);

    return { username, handleComment, comments, comment, isAuthorized };
  },
};
</script>

<style lang="scss" src="./CommentsComponent.scss" scoped />
