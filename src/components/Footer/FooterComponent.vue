<template>
  <footer class="footer">
    <div class="footer__grid">
      <img
        class="footer__logo"
        alt="ScoresFC logo"
        src="@/assets/logo/full/Full_v1.svg"
      />

      <nav>
        <p class="footer__nav-header">Account</p>
        <ul class="footer__nav-list">
          <li><a class="footer__nav-link" href="/signup">Sign Up</a></li>
          <li><a class="footer__nav-link" href="/signin">Sign In</a></li>
          <li><a class="footer__nav-link" href="/signin-admin">Admin</a></li>
        </ul>
      </nav>

      <nav>
        <p class="footer__nav-header">About us</p>
        <ul class="footer__nav-list">
          <li><a class="footer__nav-link" href="#">Few words about us</a></li>
          <li>
            <a
              class="footer__nav-link"
              href="https://psychologia.edu.pl/component/content/article/1-latest-news/1303-telefon-zaufania-801-889-880.html"
              >Help with addiction</a
            >
          </li>
        </ul>
      </nav>

      <p class="footer__copyright">
        Copyright &copy; <span class="year">2023</span> &#124; Wojciech
        Sutkowski &#124; All rights reserved.
      </p>
    </div>
  </footer>
</template>

<style lang="scss" src="./FooterComponent.scss" scoped />
