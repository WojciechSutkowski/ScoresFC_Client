<template>
  <header class="header">
    <router-link to="/">
      <img
        class="header__logo"
        src="@/assets/logo/full/Full_v1.svg"
        alt="logo"
      />
    </router-link>
    <div>
      <input type="text" class="header__search" placeholder="Search..." />
    </div>
    <button type="primary" class="header__button" @click="handleBtnClick">
      Sign In
    </button>
    <nav class="header__nav row">
      <button
        type="primary"
        class="header__nav__button header__nav__button--active"
      >
        Favourites
      </button>
      <button type="primary" class="header__nav__button">World</button>
      <button type="primary" class="header__nav__button">Europe</button>
      <button type="primary" class="header__nav__button">North America</button>
      <button type="primary" class="header__nav__button">South America</button>
      <button type="primary" class="header__nav__button">Africa</button>
      <button type="primary" class="header__nav__button">Asia</button>
      <button type="primary" class="header__nav__button">Oceania</button>
    </nav>
  </header>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const handleBtnClick = () => router.push("/signin");
    return { handleBtnClick };
  },
};
</script>

<style lang="scss" src="./HeaderComponent.scss" scoped />
