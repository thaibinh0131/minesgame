<script lang="ts" setup>
const props = defineProps({
  variant: {
    type: String,
    default: "main",
  },
});
</script>
<template>
  <div :class="['base-card', `base-card--${props.variant}`]">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-card {
  @apply p-6;
  background: rgba(5, 5, 16, 0.8);
  &--padding-small {
    @apply py-4;
  }
}
</style>
