<template>
  <header class="header">
    <img
      class="header__logo"
      src="@/assets/logo/full/Full_v1.svg"
      alt="logo"
      @click="handleLogo"
    />

    <div class="header__search">
      <input
        @keyup="handleSearch"
        type="search"
        class="header__search search__input"
        placeholder="Search..."
      />
      <select class="header__search search__type">
        <option value="team">Team</option>
        <option value="league">League</option>
      </select>
    </div>

    <button
      class="header__button"
      @click="handleLogin"
      v-if="!store._state.data.auth.userIsAuthorized"
    >
      Login
    </button>

    <div
      class="header__profile"
      @click="handleProfile"
      v-if="store._state.data.auth.userIsAuthorized"
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
          <p @click="handleLogout">Logout</p>
        </li>
      </ul>
    </div>

    <nav class="header__nav">
      <ul class="header__nav__list">
        <!-- FAVOURITES -->
        <router-link to="/favourites">
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
// import router from '@/router';
import { allContinents } from '@/data/index';
import store from '@/store/index';

export default {
  setup() {
    const router = useRouter();

    const isProfileDropdownOpen = ref(false);
    const isProfileClicked = ref(false);

    const username = localStorage.getItem('username');

    const handleLogo = () => router.push('/');

    const handleLogin = () => router.push('/login');

    const handleProfile = () => {
      const profileList = document.querySelectorAll('dropdown_list')[0];
      profileList.style.visibility = 'visible';
    };

    const handleLogout = () => {
      localStorage.clear();
      router.go('/');
    };

    const handleSearch = (event) => {
      if (event.code === 'Enter') {
        event.preventDefault();
        const input = document.querySelector('.search__input');
        const type = document.querySelector('.search__type');
        console.log(input.value);
        console.log(type.value);
        localStorage.setItem('search', input.value);
        router.push({
          name: 'Search results',
          params: {
            type: type.value,
          },
        });
      }
    };

    return {
      handleLogin,
      handleProfile,
      handleLogout,
      username,
      isProfileDropdownOpen,
      isProfileClicked,
      allContinents,
      handleLogo,
      handleSearch,
      store,
    };
  },
};
</script>

<style lang="scss" src="./HeaderComponent.scss" scoped />
