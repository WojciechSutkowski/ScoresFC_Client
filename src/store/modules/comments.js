import axios from 'axios';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

export const useComments = defineStore('comments', {
  state: () => ({
    comments: [],
  }),
  actions: {
    async getComments() {
      try {
        const route = useRoute();
        const params = {
          gameId: route.params.id,
        };

        const res = await axios.get(
          `http://localhost:5000/comments/${params.gameId}`
        );

        console.log(res);

        let replacement = [];

        for (let i = 0; i < res.data.allComments.length; i++) {
          replacement[i] = {
            comment: res.data.allComments[i].comment,
            username: res.data.allComments[i].username,
            date: res.data.allComments[i].createdAt
              .replace(/T/, ' ')
              .replace(/\..+/, ''),
          };
        }

        replacement.reverse();

        this.comments = replacement;
      } catch (err) {
        console.log(err);
      }
    },
    async setComment(comment, route) {
      try {
        const params = {
          username: localStorage.getItem('username'),
          gameId: route.params.id,
          comment: comment,
        };

        await axios.post('http://localhost:5000/comments/create', params);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
