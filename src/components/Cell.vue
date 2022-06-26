<script lang="ts" setup>
import { cloneDeep } from "lodash-es";

import type { CellData } from "@/types";
import type { PropType } from "vue";
import { useCell } from "@/hooks";

const props = defineProps({
  cell: {
    type: Object as PropType<CellData>,
    default: null,
  },
});

const { handleOpenCell, handlePlaceFlag, isGameEnded } = useCell();

const handleAddFlagOnCell = (e: Event) => {
  e.preventDefault();
  handlePlaceFlag(props.cell);
};

watch(
  () => props.cell,
  () => {
    console.debug("cell change");
  },
  {
    deep: true,
  }
);
</script>

<template>
  <button
    v-if="cell"
    @click="handleOpenCell(cloneDeep(cell))"
    @contextmenu="handleAddFlagOnCell"
    :class="[
      'cell',
      {
        'cell--opened': cell.isOpened,
      },

      {
        'cell--correct':
          cell.hasFlag && cell.hasMine && cell.isOpened && isGameEnded,
      },
      {
        'cell--incorrect': cell.hasFlag && !cell.hasMine && isGameEnded,
      },
      // {
      //   'cell--has-boom': cell.hasMine,
      // },
    ]"
  >
    <span v-if="cell.hasFlag"><FlagIcon class="w-6 h-6" /> </span>

    <span v-else-if="cell.hasMine && cell.isOpened"
      ><BoomIcon class="w-6 h-6"
    /></span>
    <span v-else>
      {{ cell.minesSurroundCount ? cell.minesSurroundCount : "" }}
    </span>
  </button>
</template>

<style lang="scss">
.cell {
  @apply bg-gray-500 w-10 h-10;
  @apply border border-black;
  @apply text-xl;
  @apply flex items-center justify-center;
  &--opened {
    @apply bg-white;
  }
  &--correct {
    @apply bg-primary;
  }
  &--incorrect {
    @apply bg-red-500;
  }
}
</style>
