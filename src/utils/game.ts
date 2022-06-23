import type { Board, CellData } from "@/types";

export const generateBoardWithMinesForGame = (
  rows: number,
  columns: number,
  mines: number
): Board => {
  let board: Board = [];
  for (let row = 0; row < rows; row++) {
    board.push([]);
    for (let col = 0; col < columns; col++) {
      board[row].push({
        rowIndex: row,
        colIndex: col,
        hasFlag: false,
        hasMine: false,
        isOpened: false,
        minesSurroundCount: 0,
        id: `${row}_${col}`,
      });
    }
  }
  // Creating mines
  for (let i = 0; i < mines; i++) {
    const randomRowIndex = Math.floor(Math.random() * rows);
    const randomColIndex = Math.floor(Math.random() * columns);
    const cell = board[randomRowIndex][randomColIndex];

    if (cell.hasMine) {
      i--;
    } else {
      cell.hasMine = true;
    }
  }
  return board;
};

export const findMinesNearby = (board: Board, cell: CellData) => {
  let minesNearby = 0;
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
      newRowIndex < board.length && // (2)
      newColIndex < board[0].length // (2)
    ) {
      if (board[newRowIndex][newColIndex].hasMine) {
        minesNearby++;
      }
    }
  }
  return minesNearby;
};
