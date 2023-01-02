import axios from 'axios';
import { defineStore } from 'pinia';

export const useAdmin = defineStore('admin', {
  state: () => ({
    comments: [],
  }),
  actions: {
    async getComments() {
      try {
        const res = await axios.get('http://localhost:5000/comments/');

        console.log(res);

        let replacement = [];

        for (let i = 0; i < res.data.allComments.length; i++) {
          replacement[i] = {
            username: res.data.allComments[i].username,
            comment: res.data.allComments[i].comment,
            id: res.data.allComments[i]._id,
          };
        }

        replacement.reverse();

        this.comments = replacement;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteComment(id) {
      try {
        const params = {
          username: localStorage.getItem('username'),
          _id: id,
        };

        await axios.delete('http://localhost:5000/comments/delete', {
          params,
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
