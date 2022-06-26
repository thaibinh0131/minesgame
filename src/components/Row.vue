<script lang="ts" setup>
import type { Row } from "@/types";
import type { PropType } from "vue";

defineProps({
  row: {
    type: Object as PropType<Row>,
    default: null,
  },
});
</script>

<template>
  <div class="grid grid-cols-16">
    <Cell v-for="(cell, index) in row" :key="cell.id" :cell="cell"></Cell>
  </div>
</template>
