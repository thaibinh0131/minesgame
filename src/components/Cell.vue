<script lang="ts" setup>
import { cloneDeep } from "lodash-es";

import type { CellData } from "@/types";
import type { PropType } from "vue";
import { useGame } from "@/hooks";

const props = defineProps({
  cell: {
    type: Object as PropType<CellData>,
    default: null,
  },
});

const { handleOpenCell } = useGame();

watch(
  () => props.cell,
  () => {
    console.debug("cell change");
  }
);
</script>

<template>
  <button
    v-if="cell"
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
    <span v-if="cell.hasMine"><BoomIcon v-if="cell.isOpened" /></span>
    <span v-else-if="cell.hasFlag"><FlagIcon /> </span>
    <span v-else>
      {{ cell.minesSurroundCount ? cell.minesSurroundCount : "" }}
    </span>
  </button>
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
