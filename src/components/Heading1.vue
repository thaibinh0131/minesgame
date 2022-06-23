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
    class="heading1 text-2xl font-medium leading-8 mb-11"
    :class="`heading1--${variant}`"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.heading1 {
  &--light {
    @apply text-white;
  }
}
</style>
