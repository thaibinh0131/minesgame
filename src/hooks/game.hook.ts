import { cloneDeep, isEqual } from "lodash-es";
import { useInterval } from "@vueuse/core";
import { GameStatus } from "@/types";
import type { Board, CellData } from "@/types";
import { MAX_MINES_AND_FLAGS } from "@/constants";
import {
  generateBoardWithMinesForGame,
  findMinesNearby,
  //   openCellDoNotHaveMineNearBy,
} from "@/utils";

const status = ref<GameStatus>(GameStatus.waiting);
const numOfRowsAndCols = ref(16);
const flagsLeft = ref(MAX_MINES_AND_FLAGS);
const board = ref<Board>([]);

// 1s
const {
  counter: timeInSeconds,
  pause: pauseCountTime,
  resume: startCountTime,
} = useInterval(1000, {
  controls: true,
  immediate: false,
});

const isGameEnded = computed(() => status.value === GameStatus.ended);
const openedCellsNumber = computed(() => {
  return board.value.reduce((total, row) => {
    const totalOpenedCellsOfRow = row.filter((el) => el.isOpened).length;
    return total + totalOpenedCellsOfRow;
  }, 0);
});

const setEndGame = () => {
  status.value = GameStatus.ended;
  pauseCountTime();
};

export const useCell = () => {
  const openCellDoNotHaveMineNearBy = (cell: CellData) => {
    const deltaRow = [-1, -1, -1, 0, 1, 1, 1, 0];
    const deltaCol = [-1, 0, 1, 1, 1, 0, -1, -1];
    for (let i = 0; i < deltaRow.length; i++) {
      const newRowIndex = cell.rowIndex + deltaRow[i];
      const newColIndex = cell.colIndex + deltaCol[i];
      // (1) Means the left sides position of the row/col surround is valid (still on the board)
      // (2) Means the right sides position of the row/col is valid (still on the board)
      if (
        newRowIndex >= 0 && // (1)
        newColIndex >= 0 && // (1)
        newRowIndex < board.value.length && // (2)
        newColIndex < board.value[0].length // (2)
      ) {
        const currentCell = cloneDeep(board.value[newRowIndex][newColIndex]);
        if (!currentCell.hasMine && !currentCell.isOpened) {
          handleOpenCell(currentCell);
        }
      }
    }
  };
  const handleOpenCell = (cell: CellData) => {
    const handleFirstCellClick = () => {
      timeInSeconds.value = 0;
      status.value = GameStatus.running;
      startCountTime();
    };
    if (isGameEnded.value) return;

    const current = board.value[cell.rowIndex][cell.colIndex];

    const numberOfMinesNearby = findMinesNearby(board.value, current);

    if (current.hasMine) {
      board.value[cell.rowIndex][cell.colIndex].isOpened = true;
      setEndGame();
      return;
    } else {
      if (cell.hasFlag || cell.isOpened) return;
      if (openedCellsNumber.value === 0) {
        handleFirstCellClick();
      }

      board.value[cell.rowIndex][cell.colIndex] = {
        ...board.value[cell.rowIndex][cell.colIndex],
        isOpened: true,
        minesSurroundCount: numberOfMinesNearby,
      };

      if (numberOfMinesNearby === 0 && !current.hasMine) {
        openCellDoNotHaveMineNearBy(cell);
      }
    }
  };

  return {
    handleOpenCell,
  };
};

export const useGame = () => {
  const initializeGame = () => {
    status.value = GameStatus.waiting;
    const initializedBoard = generateBoardWithMinesForGame(
      numOfRowsAndCols.value,
      numOfRowsAndCols.value,
      MAX_MINES_AND_FLAGS
    );
    board.value = cloneDeep(initializedBoard);
    pauseCountTime();
    timeInSeconds.value = 0;
  };
  watch(openedCellsNumber, (value) => {
    if (
      value ===
      numOfRowsAndCols.value * numOfRowsAndCols.value - MAX_MINES_AND_FLAGS
    ) {
      setEndGame();
    }
  });
  watch(
    board,
    () => {
      console.debug("boardChanged");
    },
    {
      deep: true,
    }
  );

  return {
    initializeGame,
    timeInSeconds,
    board,
    flagsLeft,
    status,
  };
};
