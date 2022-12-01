<template>
  <header-component></header-component>
  <div class="main-container" style="font-size: 4rem">{{ headings }}</div>
  <footer-component></footer-component>
</template>

<script>
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import FooterComponent from "@/components/Footer/FooterComponent.vue";
import { useRoute } from "vue-router";
import { reactive, toRefs } from "vue";
import axios from "axios";

export default {
  setup() {
    const route = useRoute();

    const state = reactive({
      headings: [],
    });

    const params = {
      id: route.params.id,
      season: route.params.season,
    };

    const xd = async () => {
      return await axios
        .get(
          `http://localhost:5000/leagues/${params.id}/${params.season}`
          // {
          //   params,
          // }
        )
        .then(
          (res) => {
            if (res.status == "200") {
              console.log(res.data);
              const data = res.data;
              state.headings = {
                seasons: data["seasons"],
              };
              console.log(state.headings.seasons);
            }
          },
          (err) => {
            console.log(err.response);
          }
        );
    };

    console.log(xd());
    const { headings } = toRefs(state);
    console.log(headings);

    return { headings };
  },
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style lang="scss"></style>
