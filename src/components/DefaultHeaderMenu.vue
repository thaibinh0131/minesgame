<template>
  <ul class="default-header__menu">
    <li>
      <router-link to="/">Games</router-link>
    </li>
    <li>
      <router-link to="/leader-board">LeaderBoard</router-link>
    </li>
    <li>
      <a>About me</a>
    </li>
  </ul>
</template>

<style lang="scss">
.default-header__menu {
  @apply flex items-center flex-col lg:flex-row;
  li {
    @apply mr-0 lg:mr-6 mb-4 lg:mb-0;
    a {
      @apply hover:text-black;
      @apply text-xl font-bold;
    }
  }
}
</style>
