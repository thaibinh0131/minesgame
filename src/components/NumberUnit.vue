<script lang="ts" setup>
import { toNumberUnits } from "@/helpers/formatter";

const props = defineProps({
  value: {
    type: [String, Number],
    default: "0",
  },
  prefix: {
    type: String,
    default: "",
  },

  valueFormat: {
    type: String,
    default: "short",
  },
});
</script>

<template>
  <div class="font-bold text-sm leading-4 w-max">
    <span v-if="Number(props.value)">{{ props.prefix }}</span
    >{{ toNumberUnits(props.value, valueFormat) }}
  </div>
</template>
