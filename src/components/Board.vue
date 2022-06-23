<script lang="ts" setup>
import { useGame } from "@/hooks";
import { cloneDeep } from "lodash-es";

const { board, status, initializeGame } = useGame();
onMounted(() => {
  initializeGame();
});
</script>

<template>
  <div class="border border-black">
    <Row v-for="(row, index) in board" :row="row"></Row>
  </div>
</template>
