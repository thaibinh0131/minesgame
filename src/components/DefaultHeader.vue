<script setup lang="ts">
const drawerVisible = ref(false);
</script>

<template>
  <div class="default-header">
    <div class="default-header__logo">
      <router-link to="/" class="flex items-end hover:text-black">
        <BoomIcon class="w-10 h-10" />
        <div class="font-bold text-3xl ml-4">Mines Looking</div>
      </router-link>
    </div>
    <div class="default-header__menu hidden lg:block">
      <DefaultHeaderMenu />
    </div>
    <div class="default-header__user f">
      <div class="block lg:hidden">
        <button @click="drawerVisible = true">
          <MenuIcon class="" />
        </button>
      </div>
    </div>

    <a-drawer
      title=""
      placement="right"
      :closable="false"
      :visible="drawerVisible"
      class="header__drawer"
      @close="drawerVisible = false"
    >
      <div class="flex justify-end mb-4">
        <button @click="drawerVisible = false">
          <CloseIcon class="w-4 h-4" />
        </button>
      </div>
      <div class="mb-10 flex justify-center">
        <BoomIcon class="w-10 h-10" />
        <div class="font-bold text-3xl ml-4">Mines Looking</div>
      </div>
      <DefaultHeaderMenu class="mb-4" />
    </a-drawer>
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
