<script lang="ts" setup>
import { toPercent } from "@/helpers/formatter";

const props = defineProps({
  value: {
    type: [String, Number],
    default: "0",
  },
  prefix: {
    type: String,
    default: "",
  },

  dp: {
    type: Number,
    default: 2,
  },
  variant: {
    type: String,
    default: "main",
  },
});
</script>

<template>
  <div class="leading-4 value">
    {{ props.prefix }}{{ toPercent(props.value, dp) }}
  </div>
</template>
