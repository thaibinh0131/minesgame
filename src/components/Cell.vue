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

const { handleOpenCell } = useCell();

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
    :class="[
      'cell',
      {
        'cell--opened': cell.isOpened,
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
</style>
