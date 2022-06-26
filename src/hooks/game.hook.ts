import { cloneDeep, isEqual } from "lodash-es";
import { useInterval } from "@vueuse/core";
import { formatDistanceToNowStrict } from "date-fns";

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
const isUserWon = ref(false);
const isShowModalGameStats = ref(false);
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

const shouldDisableButtonReset = computed(() => {
  return status.value !== GameStatus.ended;
});

const formattedDistance = computed(() => {
  const now = Date.now();
  return formatDistanceToNowStrict(new Date(now + timeInSeconds.value * 1000));
});

const flagsUsed = computed(() => MAX_MINES_AND_FLAGS - flagsLeft.value);
const minesFound = computed(() => {
  return board.value.reduce((total, row) => {
    const totalValidMinesFound = row.filter(
      (el) => el.hasFlag && el.hasMine
    ).length;
    return total + totalValidMinesFound;
  }, 0);
});

const openAllMines = () => {
  const newBoards = cloneDeep(board.value);
  for (let rowIndex = 0; rowIndex < numOfRowsAndCols.value; rowIndex++) {
    for (let colIndex = 0; colIndex < numOfRowsAndCols.value; colIndex++) {
      if (
        newBoards[rowIndex][colIndex].hasMine &&
        !newBoards[rowIndex][colIndex].isOpened
      )
        newBoards[rowIndex][colIndex].isOpened = true;
    }
  }
  board.value = cloneDeep(newBoards);
};

const setEndGame = (won: boolean) => {
  status.value = GameStatus.ended;
  isUserWon.value = won;
  isShowModalGameStats.value = true;
  openAllMines();
  pauseCountTime();
};

const initializeGame = () => {
  status.value = GameStatus.waiting;
  flagsLeft.value = MAX_MINES_AND_FLAGS;
  const initializedBoard = generateBoardWithMinesForGame(
    numOfRowsAndCols.value,
    numOfRowsAndCols.value,
    MAX_MINES_AND_FLAGS
  );
  board.value = cloneDeep(initializedBoard);
  pauseCountTime();
  timeInSeconds.value = 0;
};

const handleFirstCellClickOrFlagPlaced = () => {
  timeInSeconds.value = 0;
  status.value = GameStatus.running;
  startCountTime();
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
    if (isGameEnded.value) return;

    const current = board.value[cell.rowIndex][cell.colIndex];

    const numberOfMinesNearby = findMinesNearby(board.value, current);

    if (current.hasMine) {
      board.value[cell.rowIndex][cell.colIndex].isOpened = true;
      setEndGame(false);
      return;
    } else {
      if (cell.hasFlag || cell.isOpened) return;
      if (
        openedCellsNumber.value === 0 &&
        timeInSeconds.value === 0 &&
        flagsLeft.value === MAX_MINES_AND_FLAGS
      ) {
        handleFirstCellClickOrFlagPlaced();
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
  const handlePlaceFlag = (cell: CellData) => {
    if (cell.isOpened || isGameEnded.value) return;
    if (
      !cell.hasFlag &&
      flagsLeft.value === MAX_MINES_AND_FLAGS &&
      timeInSeconds.value === 0 &&
      openedCellsNumber.value === 0
    ) {
      handleFirstCellClickOrFlagPlaced();
    }
    if (!cell.hasFlag) {
      if (flagsLeft.value > 0) {
        flagsLeft.value -= 1;
        board.value[cell.rowIndex][cell.colIndex].hasFlag = true;
      }
    } else {
      flagsLeft.value += 1;
      board.value[cell.rowIndex][cell.colIndex].hasFlag = false;
    }
  };

  return {
    handleOpenCell,
    handlePlaceFlag,
    isGameEnded,
  };
};

export const useGameStats = () => {
  const setModalGameStatsState = (val: boolean) => {
    isShowModalGameStats.value = val;
  };
  return {
    openedCellsNumber,
    timeInSeconds,
    flagsLeft,
    isUserWon,
    isShowModalGameStats,
    formattedDistance,
    minesFound,
    flagsUsed,

    setModalGameStatsState,
    initializeGame,
  };
};

export const useGame = () => {
  watch(openedCellsNumber, (value) => {
    if (
      value ===
      numOfRowsAndCols.value * numOfRowsAndCols.value - MAX_MINES_AND_FLAGS
    ) {
      setEndGame(true);
    }
  });
  watch(minesFound, (value) => {
    if (value === MAX_MINES_AND_FLAGS) {
      setEndGame(true);
    }
  });

  return {
    initializeGame,
    timeInSeconds,
    board,
    flagsLeft,
    status,
    shouldDisableButtonReset,
    openedCellsNumber,
    formattedDistance,
  };
};
