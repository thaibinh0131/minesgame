<script setup lang="ts">

</script>

<template>
  <div  class="default-header">
    <div class="default-header__logo">
      <router-link to="/" class="flex items-end hover:text-black">
        <BoomIcon class="w-10 h-10" />
        <div class="font-bold text-3xl ml-4">Mines Looking</div>
      </router-link>
    </div>
    <div class="default-header__menu">
      <DefaultHeaderMenu />
    </div>
    <div class="default-header__user">User</div>
  </div>
</template>

<style lang="scss" scoped>
.default-header {
  @apply px-10 py-6;
  @apply mb-4;
  @apply flex items-center justify-between;
  @apply sticky top-0 w-full bg-white;
  @apply border-b border-gray-300;
  @apply shadow-md;
  @apply z-10;
  &__logo {
    @apply cursor-pointer;
  }
}
</style>
