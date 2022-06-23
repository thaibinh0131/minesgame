<script lang="ts" setup>
import type { HTMLElementEvent } from "@/types";

defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "md",
  },
});
const emit = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  const e = event as HTMLElementEvent<HTMLInputElement>;
  emit("update:modelValue", e.target.value);
};
</script>

<template>
  <div class="search-input" :class="`search-input--${variant}`">
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    />
    <SearchIcon class="search-input__icon text-icon-default" />
  </div>
</template>

<style lang="scss">
.search-input {
  @apply flex items-center;
  @apply relative;
  @apply w-max;
  input {
    @apply py-1 px-8;
    @apply rounded-md;
    @apply w-full;
    @apply bg-transparent;
  }
  &--md {
    input {
      @apply h-10;
    }
  }
  &__icon {
    @apply absolute left-2;
    @apply w-4 h-4;
  }
}
</style>
