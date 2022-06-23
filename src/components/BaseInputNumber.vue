<script lang="ts" setup>
import type { PropType, Ref } from "vue";
import type Cleave from "cleave.js";
import type { CleaveOptions } from "cleave.js/options";
import { isFinite } from "lodash-es";
import type { HTMLElementEvent } from "@/types";

const props = defineProps({
  modelValue: { type: String, required: true },

  id: { type: String, default: undefined },
  name: { type: String, default: "amount" },
  placeholder: { type: String, default: undefined },
  options: {
    type: Object as PropType<CleaveOptions>,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue", "blur"]);

const inputInstance = ref(
  null as null | Ref<{ cleave: Cleave } & HTMLInputElement>
);
const onValueChanged = (e: { target: { value: string; rawValue: string } }) => {
  const { rawValue } = e.target;
  const modalValueString = toRawValue(props.modelValue);

  if (rawValue === modalValueString) return;
  emit("update:modelValue", rawValue);
};

const format = computed<CleaveOptions>(() => ({
  numeralPositiveOnly: true,
  numeral: true,
  numeralDecimalScale: 8,
  onValueChanged,
  ...props.options,
}));

watch(
  () => props.modelValue,
  async (val) => {
    if (!inputInstance.value) return;

    const rawValue = inputInstance.value.cleave.getRawValue();
    if (rawValue === toRawValue(val)) return;

    inputInstance.value.cleave.setRawValue(val ? toRawValue(val) : "");
  },
  { immediate: true }
);

const strToNumber = (input: string) =>
  Number(`${input}`.replace(/[^0-9-.]/g, ""));

const toRawValue = (input: any): string => {
  if (typeof input === "number") {
    if (isFinite(input)) return String(input);
    return "";
  }
  if (typeof input === "string") {
    if (input === "") return "";

    if (!isFinite(strToNumber(input))) return "";
    return input.replace(/[^0-9-.]/g, "");
  }

  return "";
};
const handleBlur = (e: Event) => {
  const event = e as HTMLElementEvent<HTMLInputElement>;
  emit("blur", event.target.value);
};
</script>

<template>
  <input
    ref="inputInstance"
    v-format="format || { numeral: true }"
    :id="id"
    :name="name"
    :value="modelValue"
    :placeholder="placeholder"
    class="b-input-number"
    autocomplete="off"
    type="text"
    @blur="handleBlur"
  />
</template>

<style lang="scss">
.b-input-number {
  @apply block w-full;
  @apply min-w-0 px-2;
  @apply focus:outline-none;
  @apply bg-transparent;
}
</style>
