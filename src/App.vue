<template>
  <header-component />
  <router-view :key="$route.fullPath" />
  <footer-component /><button @click="scrollToTop" class="scrollToTop">
    Top
  </button>
</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue';
import FooterComponent from '@/components/Footer/FooterComponent.vue';
export default {
  setup() {
    const scrollBtn = document.getElementsByClassName('scrollToTop');

    const scrollFunction = () => {
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        scrollBtn[0].style.display = 'block';
      } else {
        scrollBtn[0].style.display = 'none';
      }
    };

    window.onscroll = function () {
      scrollFunction();
    };

    // When the user clicks on the button, scroll to the top of the document
    const scrollToTop = () => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    return { scrollToTop };
  },
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style lang="scss" src="./main.scss" />
