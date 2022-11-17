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

    <button class="header__button" v-if="this.$store.state.userIsAuthorized">
      Comparator
    </button>

    <button
      class="header__button"
      @click="handleBtnClick"
      v-if="!this.$store.state.userIsAuthorized"
    >
      Sign In
    </button>

    <div
      class="header__dropdown"
      @click="handleProfileClick"
      v-if="this.$store.state.userIsAuthorized"
    >
      <div>Username</div>
      <ul class="dropdown_list">
        <li>Profile</li>
        <li>Settings</li>
        <li><button>Logout</button></li>
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

    function handleProfileClick() {
      const profileList = document.getElementsByClassName("dropdown_list")[0];

      profileList.style.visibility = "visible";
    }
    return { handleBtnClick, handleProfileClick };
  },
};
</script>

<style lang="scss" src="./HeaderComponent.scss" scoped />
