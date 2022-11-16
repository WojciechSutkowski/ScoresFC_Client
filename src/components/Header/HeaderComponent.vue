<template>
  <header class="header">
    <router-link to="/">
      <img
        class="header__logo"
        src="@/assets/logo/full/Full_v1.svg"
        alt="logo"
      />
    </router-link>

    <input type="text" class="header__search" placeholder="Search..." />

    <button class="header__button" hidden>Comparator</button>

    <button class="header__button" @click="handleBtnClick">Sign In</button>

    <div class="header__dropdown" hidden>
      <div>Username</div>
      <ul class="hide">
        <li>Profile</li>
        <li>Settings</li>
      </ul>
    </div>

    <nav class="header__nav">
      <ul class="header__nav__list">
        <li class="header__nav__item header__nav__item--active">Favourites</li>
        <li class="header__nav__item">World</li>
        <li class="header__nav__item">Europe</li>
        <li class="header__nav__item">North America</li>
        <li class="header__nav__item">South America</li>
        <li class="header__nav__item">Africa</li>
        <li class="header__nav__item">Asia</li>
        <li class="header__nav__item">Oceania</li>
      </ul>
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
