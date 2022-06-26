<script lang="ts" setup>
import type { PropType } from "vue";

const props = defineProps({
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button",
  },
  variant: { type: String, default: "main" },
  target: { type: String, default: "_blank" },
  link: { type: Boolean, default: false },
  href: { type: String, default: undefined },
  rel: { type: String, default: undefined },
  to: {
    type: [String, Object],
    default: undefined,
  },
  disabled: { type: Boolean, default: false },
  label: { type: Boolean, default: false },
  rounded: {
    type: String as PropType<"none" | "full" | "normal" | "sm" | "md" | "lg">,
    default: "full",
  },
});

const className = computed(() => {
  return [
    "base-btn",
    `base-btn--${props.variant}`,
    {
      "base-btn--disabled": props.disabled,
      "base-btn--label": props.label,

      "rounded-full": props.rounded === "full",
      rounded: props.rounded === "normal",
      "rounded-sm": props.rounded === "sm",
      "rounded-md": props.rounded === "md",
      "rounded-lg": props.rounded === "lg",
    },
  ];
});
</script>

<template>
  <router-link v-if="link && to" :class="className" :to="to">
    <slot />
  </router-link>
  <a
    v-else-if="link && href"
    :class="className"
    :href="href"
    :target="target"
    :rel="rel"
  >
    <slot />
  </a>
  <button v-else :class="className" :disabled="disabled" :type="type">
    <slot />
  </button>
</template>

<style lang="scss">
.base-btn {
  @apply flex justify-center items-center;
  @apply px-4 py-2;
  @apply font-medium text-sm;
  @apply transition;
  @apply focus:outline-none;
  @apply cursor-pointer;
  @apply select-none;
  &--main {
    @apply bg-primary text-white;
    @apply min-w-120px;
  }
  &:disabled {
    @apply cursor-not-allowed opacity-70;
  }
}
</style>
