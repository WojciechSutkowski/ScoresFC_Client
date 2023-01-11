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

        let replacement = [];

        for (let i = 0; i < res.data.gameComments.length; i++) {
          replacement[i] = {
            comment: res.data.gameComments[i].comment,
            username: res.data.gameComments[i].username,
            date: res.data.gameComments[i].createdAt
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
        const token = localStorage.getItem('token');
        const parsedToken = JSON.parse(token);
        const bearer = parsedToken.token.bearer;
        const username = parsedToken.token.username;

        const params = {
          username: username,
          gameId: route.params.id,
          comment: comment,
        };
        const headers = { Authorization: bearer };

        await axios.post(
          'http://localhost:5000/comments/create',
          { params },
          {
            headers,
          }
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
});
