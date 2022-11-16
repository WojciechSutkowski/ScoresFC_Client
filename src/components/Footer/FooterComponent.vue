<template>
  <footer class="footer">
    <div class="footer__grid">
      <img
        class="footer__logo"
        alt="ScoresFC logo"
        src="@/assets/logo/full/Full_v1.svg"
      />

      <nav class="nav-col">
        <p class="footer-heading">Account</p>
        <ul class="footer-nav">
          <li><a class="footer-link" href="/signup">Sign Up</a></li>
          <li><a class="footer-link" href="/signin">Sign In</a></li>
        </ul>
      </nav>

      <nav class="nav-col">
        <p class="footer-heading">About us</p>
        <ul class="footer-nav">
          <li><a class="footer-link" href="#">Few words about us</a></li>
          <li>
            <a
              class="footer-link"
              href="https://psychologia.edu.pl/component/content/article/1-latest-news/1303-telefon-zaufania-801-889-880.html"
              >Help with addiction</a
            >
          </li>
        </ul>
      </nav>

      <p class="copyright">
        Copyright &copy; <span class="year">2023</span> &#124; Wojciech
        Sutkowski &#124; All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" src="./FooterComponent.scss" />
