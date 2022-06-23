<script setup lang="ts"></script>

<template>
  <div
    class="market-page w-full h-screen flex items-center justify-center text-6xl"
  >
    VUE3 TEMPLATE
  </div>
</template>

<style lang="scss">
.market-page {
  &__stats {
    @screen laptop {
      @apply laptop:grid gap-x-8;
      grid-template-columns: 3fr 5fr;
    }

    .base-card {
      @apply mb-6;
      &:first-child {
        min-width: unset;
        @screen laptop {
          min-width: 448px;
        }
      }
    }
  }
  &__market-size {
    @apply mt-12;
  }
}
</style>
