<script lang="ts" setup>
import { toCurrency } from "@/helpers/formatter";

defineProps({
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
});
</script>

<template>
  <div class="font-bold leading-4 w-max">
    {{ prefix }}{{ toCurrency(value, dp, true, true) }}
  </div>
</template>
