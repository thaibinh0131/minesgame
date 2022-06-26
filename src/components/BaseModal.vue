<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);
const visible = ref(false);
const handleAfterClose = () => {
  emit("update:modelValue", false);
};

watch(
  () => props.modelValue,
  () => {
    visible.value = props.modelValue;
  }
);
</script>

<template>
  <a-modal
    v-bind="$attrs"
    v-model:visible="visible"
    wrap-class-name="base-modal"
    :after-close="handleAfterClose"
    :destroy-on-close="true"
    centered
    :footer="null"
  >
    <template #title>
      <div class="text-center">
        <div class="text-center leading-5 text-2xl font-bold">
          {{ title }}
        </div>
      </div>
    </template>
    <slot></slot>
  </a-modal>
</template>

<style lang="scss">
.base-modal {
  .ant-modal-content {
    border-radius: 8px;
  }
  .ant-modal-header {
    @apply border-none;
    @apply pt-6;
    @apply text-center normal-case;
    border-radius: 8px 8px 0 0;
  }
  .ant-modal-body {
    @apply p-8 pt-0;
  }
}
</style>
