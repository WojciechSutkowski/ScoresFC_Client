<template>
  <div class="main-container">
    <p v-if="!store._state.data.auth.adminIsAuthorized">
      You are not allowed to admin panel
    </p>
    <p v-if="store._state.data.auth.adminIsAuthorized">Welcome admin</p>
    <ul v-for="comment in comments" :key="comment.comment">
      <li>
        <p>
          {{ comment.comment }}
        </p>
        <button @click="handleDelete(comment.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '@/store/index';
import { reactive, toRefs } from 'vue';
import axios from 'axios';
export default {
  setup() {
    const state = reactive({
      comments: [],
    });

    axios.get('http://localhost:5000/comments').then(
      (res) => {
        if (res.status == '200') {
          console.log(res.data.allComments);
          for (let i = 0; i < res.data.allComments.length; i++) {
            state.comments[i] = {
              comment: res.data.allComments[i].comment,
              id: res.data.allComments[i]._id,
            };
            console.log(state.comments[i]);
          }
        }
        // window.location.reload();
      },
      (err) => {
        console.log(err.response);
      }
    );

    const handleDelete = (id) => {
      const params = {
        username: localStorage.getItem('username'),
        _id: id,
      };
      axios
        .delete('http://localhost:5000/comments/delete', {
          params,
        })
        .then(
          (res) => {
            if (res.status == '200') {
              console.log(`Removed comment ID ${params._id}`);
              location.reload();
            }
          },
          (err) => {
            console.log(err.response);
          }
        );
    };

    const { comments } = toRefs(state);
    return { store, comments, handleDelete };
  },
};
</script>

<style></style>
