<template>
  <header class="header">
    <img
      class="header__logo"
      src="@/assets/logo/full/Full_v1.svg"
      alt="logo"
      @click="handleLogoClick"
    />

    <input type="text" class="header__search" placeholder="Search..." />

    <button
      class="header__button"
      @click="handleBtnClick"
      v-if="!this.$store.state.userIsAuthorized"
    >
      Sign In
    </button>

    <div
      class="header__profile"
      @click="handleProfileClick"
      v-if="this.$store.state.userIsAuthorized"
    >
      <div
        @click="isProfileDropdownOpen = !isProfileDropdownOpen"
        :class="{ header__profile__bar__active: isProfileDropdownOpen }"
        class="header__profile__bar"
      >
        <p>
          {{ username }}
        </p>
      </div>
      <ul class="dropdown_profile" v-if="isProfileDropdownOpen">
        <li>
          <router-link to="/profile"><p>Profile</p></router-link>
        </li>
        <li>
          <router-link to="/"><p>Settings</p></router-link>
        </li>
        <li>
          <p @click="handleLogoutClick">Logout</p>
        </li>
      </ul>
    </div>

    <nav class="header__nav">
      <ul class="header__nav__list">
        <!-- FAVOURITES -->
        <router-link to="/">
          <li class="header__nav__item header__nav__item--active">
            Favourites
          </li>
        </router-link>

        <!-- WORLD -->
        <router-link
          :to="{
            name: 'Country leagues',
            params: { country: allContinents[0] },
          }"
        >
          <li class="header__nav__item">World</li>
        </router-link>

        <!-- EUROPE -->
        <li class="header__nav__item">
          <p>Europe</p>
          <ul class="dropdown_list">
            <router-link
              :to="{
                name: 'Country leagues',
                params: { country: country },
              }"
              v-for="(country, index) in allContinents[3]"
              :key="index"
            >
              <li class="dropdown_countries">
                {{ country }}
              </li>
            </router-link>
          </ul>
        </li>

        <!-- NORTH AMERICA -->
        <li class="header__nav__item">
          <p>North America</p>
          <ul class="dropdown_list">
            <router-link
              :to="{
                name: 'Country leagues',
                params: { country: country },
              }"
              v-for="(country, index) in allContinents[4]"
              :key="index"
            >
              <li class="dropdown_countries">
                {{ country }}
              </li>
            </router-link>
          </ul>
        </li>

        <!-- SOUTH AMERICA -->
        <li class="header__nav__item">
          <p>South America</p>
          <ul class="dropdown_list">
            <router-link
              :to="{
                name: 'Country leagues',
                params: { country: country },
              }"
              v-for="(country, index) in allContinents[5]"
              :key="index"
            >
              <li class="dropdown_countries">
                {{ country }}
              </li>
            </router-link>
          </ul>
        </li>

        <!-- AFRICA -->
        <li class="header__nav__item">
          <p>Africa</p>
          <ul class="dropdown_list">
            <router-link
              :to="{
                name: 'Country leagues',
                params: { country: country },
              }"
              v-for="(country, index) in allContinents[1]"
              :key="index"
            >
              <li class="dropdown_countries">
                {{ country }}
              </li>
            </router-link>
          </ul>
        </li>

        <!-- ASIA -->
        <li class="header__nav__item">
          <p>Asia & Oceania</p>
          <ul class="dropdown_list">
            <router-link
              :to="{
                name: 'Country leagues',
                params: { country: country },
              }"
              v-for="(country, index) in allContinents[2]"
              :key="index"
            >
              <li class="dropdown_countries">
                {{ country }}
              </li>
            </router-link>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { allContinents } from '@/data/index';

export default {
  setup() {
    console.log(allContinents);
    const router = useRouter();

    const isProfileDropdownOpen = ref(false);
    const isProfileClicked = ref(false);

    const username = localStorage.getItem('username');

    function handleLogoClick() {
      router.push('/');
      setTimeout(() => {
        location.reload();
      }, 500);
    }

    const handleBtnClick = () => router.push('/signin');

    const handleProfileClick = () => {
      const profileList = document.querySelectorAll('dropdown_list')[0];

      profileList.style.visibility = 'visible';
    };

    const handleLogoutClick = () => {
      // localStorage.removeItem("token");
      localStorage.clear();
      router.go('/');
    };

    return {
      handleBtnClick,
      handleProfileClick,
      handleLogoutClick,
      username,
      isProfileDropdownOpen,
      isProfileClicked,
      allContinents,
      handleLogoClick,
    };
  },
};
</script>

<style lang="scss" src="./HeaderComponent.scss" scoped />
