<template>
  <header-component />
  <router-view :key="$route.fullPath" />
  <footer-component />
</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue';
import FooterComponent from '@/components/Footer/FooterComponent.vue';
export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style lang="scss" src="./main.scss" />
