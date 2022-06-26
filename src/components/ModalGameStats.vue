<script setup lang="ts">
import { useGameStats } from "@/hooks";

const {
  isShowModalGameStats,
  isUserWon,
  formattedDistance,
  openedCellsNumber,
  minesFound,
  flagsUsed,
  setModalGameStatsState,
  initializeGame,
} = useGameStats();

const resultText = computed(() => {
  if (isUserWon.value) {
    return "Congratulation! You won this game";
  }
  return "You lost this game!";
});

const playAgain = () => {
  setModalGameStatsState(false);
  initializeGame();
};
</script>

<template>
  <BaseModal v-model="isShowModalGameStats" title="Game Result">
    <div class="">
      <div>
        <div
          class="text-xl text-center font-bold mb-4"
          :class="isUserWon ? 'text-primary' : 'text-red-500'"
        >
          {{ resultText }}
        </div>
      </div>
      <div class="flex items-start justify-between">
        <div>
          <div class="text-xl font-bold">Your Stats</div>
          <div>Opened cells: {{ openedCellsNumber }}</div>
          <div>Time: {{ formattedDistance }}</div>
          <div>Flags used: {{ flagsUsed }}</div>
          <div>Mines found: {{ minesFound }}</div>
        </div>
        <div class="text-xl font-bold">Rank: 12</div>
      </div>

      <!-- <div class="mt-4">
        <BaseButton @click="playAgain" class="mx-auto">Play again</BaseButton>
      </div> -->
    </div>
  </BaseModal>
</template>
