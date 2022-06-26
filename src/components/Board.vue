<script lang="ts" setup>
import { useGame } from "@/hooks";
import { formatDistanceToNowStrict } from "date-fns";

const {
  board,
  shouldDisableButtonReset,
  flagsLeft,
  formattedDistance,
  initializeGame,
} = useGame();

onMounted(() => {
  initializeGame();
});
</script>

<template>
  <div class="border border-black board">
    <div class="board__header">
      <div class="flex items-center">
        <FlagIcon class="w-4 h-4 mr-2" /> {{ flagsLeft }} Flags
      </div>
      <BaseButton :disabled="shouldDisableButtonReset" @click="initializeGame"
        >Play again</BaseButton
      >
      <div>Time: {{ formattedDistance }}</div>
    </div>
    <Row v-for="(row, index) in board" :row="row"></Row>
  </div>
  <ModalGameStats />
</template>

<style lang="scss">
.board {
  &__header {
    @apply p-4;
    @apply text-base;
    @apply flex items-center justify-between;
  }
}
</style>
