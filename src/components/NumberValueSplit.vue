<script lang="ts" setup>
import { compare, BigNumber } from "@/utils/bignumber";

const props = defineProps({
  value: {
    type: [String, Number],
    default: "0",
  },
  firstDecimals: {
    type: Number,
    default: 3,
  },
  totalDecimals: {
    type: Number,
    default: 6,
  },
  prefix: {
    type: String,
    default: "",
  },
  suffix: {
    type: String,
    default: "",
  },
  firstNumberClass: {
    type: String,
    default: "",
  },
  secondNumberClass: {
    type: String,
    default: "",
  },
});

const splittedFirstValue = computed(() => {
  if (compare("gt")(props.value)(0)) {
    const output = new BigNumber(props.value)
      .toFormat(props.firstDecimals, BigNumber.ROUND_DOWN)
      .toString();
    return output;
  }
  return 0;
});
const splittedSecondValue = computed(() => {
  if (compare("gt")(props.value)(0)) {
    const stringVal = new BigNumber(props.value).toString();
    console.debug({ stringVal });
    const decimalsPart = stringVal.split(".")[1];
    console.debug({ decimalsPart });
    if (decimalsPart.length >= props.totalDecimals) {
      const output = decimalsPart
        .toString()
        .substring(props.firstDecimals, props.totalDecimals);
      return output;
    } else {
      return "";
    }
  }
  return "";
});
</script>
<template>
  <div class="flex items-end">
    <div class="font-bold flex items-center" :class="firstNumberClass">
      <div v-if="prefix">{{ prefix }}</div>
      <div>{{ splittedFirstValue }}</div>
    </div>

    <div
      class="flex items-center relative ml-1"
      :class="secondNumberClass"
      v-if="splittedSecondValue"
    >
      <div>{{ splittedSecondValue }}</div>
      <div v-if="suffix">{{ suffix }}</div>
    </div>
  </div>
</template>
