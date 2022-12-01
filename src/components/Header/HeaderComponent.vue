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
            params: { country: AllContinents[0] },
          }"
        >
          <li class="header__nav__item">World</li>
        </router-link>

        <!-- EUROPE -->
        <li class="header__nav__item">
          <p @click="isEuDropdownOpen = !isEuDropdownOpen">Europe</p>
          <ul class="dropdown_list" v-if="isEuDropdownOpen">
            <router-link
              :to="{
                name: 'Country leagues',
                params: { country: country },
              }"
              v-for="(country, index) in AllContinents[3]"
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
          <p @click="isNaDropdownOpen = !isNaDropdownOpen">North America</p>
          <ul class="dropdown_list" v-if="isNaDropdownOpen">
            <router-link
              :to="{
                name: 'Country leagues',
                params: { country: country },
              }"
              v-for="(country, index) in AllContinents[4]"
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
          <p @click="isSaDropdownOpen = !isSaDropdownOpen">South America</p>
          <ul class="dropdown_list" v-if="isSaDropdownOpen">
            <router-link
              :to="{
                name: 'Country leagues',
                params: { country: country },
              }"
              v-for="(country, index) in AllContinents[5]"
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
          <p @click="isAfDropdownOpen = !isAfDropdownOpen">Africa</p>
          <ul class="dropdown_list" v-if="isAfDropdownOpen">
            <router-link
              :to="{
                name: 'Country leagues',
                params: { country: country },
              }"
              v-for="(country, index) in AllContinents[1]"
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
          <p @click="isAsDropdownOpen = !isAsDropdownOpen">Asia</p>
          <ul class="dropdown_list" v-if="isAsDropdownOpen">
            <router-link
              :to="{
                name: 'Country leagues',
                params: { country: country },
              }"
              v-for="(country, index) in AllContinents[2]"
              :key="index"
            >
              <li class="dropdown_countries">
                {{ country }}
              </li>
            </router-link>
          </ul>
        </li>

        <!-- OCEANIA -->
        <li class="header__nav__item">
          <p @click="isAnyContinentOpen = !isAnyContinentOpen">Oceania</p>
          <ul class="dropdown_list" v-if="isAnyContinentOpen">
            <router-link
              :to="{
                name: 'Country leagues',
                params: { country: country },
              }"
              v-for="(country, index) in AllContinents[6]"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AllContinents } from "@/data/Continents";

export default {
  setup() {
    const router = useRouter();

    const isEuDropdownOpen = ref(false);
    const isNaDropdownOpen = ref(false);
    const isSaDropdownOpen = ref(false);
    const isAsDropdownOpen = ref(false);
    const isAfDropdownOpen = ref(false);
    // const isOcDropdownOpen = ref(false);
    const isProfileDropdownOpen = ref(false);
    const isProfileClicked = ref(false);
    const isAnyContinentOpen = ref(false);

    console.log(AllContinents);

    // const token = localStorage.getItem("token");
    // const parsedToken = JSON.parse(token);
    // const username = parsedToken.token.username;

    const username = localStorage.getItem("username");

    const handleBtnClick = () => router.push("/signin");

    function handleProfileClick() {
      const profileList = document.getElementsByClassName("dropdown_list")[0];

      profileList.style.visibility = "visible";
    }

    function handleLogoutClick() {
      // localStorage.removeItem("token");
      localStorage.clear();
      router.go("/");
    }

    return {
      handleBtnClick,
      handleProfileClick,
      handleLogoutClick,
      username,
      isEuDropdownOpen,
      isNaDropdownOpen,
      isSaDropdownOpen,
      isAsDropdownOpen,
      isAfDropdownOpen,
      // isOcDropdownOpen,
      isProfileDropdownOpen,
      isProfileClicked,
      isAnyContinentOpen,
      AllContinents,
    };
  },
};
</script>

<style lang="scss" src="./HeaderComponent.scss" scoped />
