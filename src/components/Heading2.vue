<script lang="ts" setup>
defineProps({
  variant: {
    type: String,
    default: "light",
  },
});
</script>
<template>
  <div
    class="heading2 text-xl font-medium leading-8"
    :class="`heading2--${variant}`"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.heading2 {
  &--light {
    @apply text-white;
  }
}
</style>
