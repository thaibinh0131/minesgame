<script lang="ts" setup>
import { useGame } from "@/hooks";
import { cloneDeep } from "lodash-es";

const { board, status, initializeGame, handleOpenCell } = useGame();
onMounted(() => {
  initializeGame();
});
</script>

<template>
  {{ status }}
  <div class="border border-black">
    <!-- <div v-for="(row, index) in board" :key="index" class="grid grid-cols-16">
      <button
        v-for="(cell, idx) in row"
        :key="idx"
        @click="handleOpenCell(cloneDeep(cell))"
        :class="[
          'cell',
          {
            'cell--opened': cell.isOpened,
          },
          {
            'cell--has-boom': cell.hasMine,
          },
        ]"
      >
        <span v-if="cell.hasMine"
          ><BoomIcon class="w-4 h-4" v-if="cell.isOpened"
        /></span>
        <span v-else-if="cell.hasFlag"><FlagIcon class="w-4 h-4" /> </span>
        <span v-else>
          {{ cell.minesSurroundCount ? cell.minesSurroundCount : "" }}
        </span>
      </button>
    </div> -->
    <Row v-for="(row, index) in board" :row="row"></Row>
  </div>
</template>

<style lang="scss" scoped>
.cell {
  @apply bg-gray-500 w-10 h-10;
  @apply border border-black;
  @apply text-xl;
}
.cell--opened {
  @apply bg-white #{!important};
}

.cell--has-boom {
  @apply bg-red-500 #{!important};
}
</style>
