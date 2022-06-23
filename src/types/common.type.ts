export enum SORT_TYPE {
  ASC = "ASC",
  DESC = "DESC",
}

export enum GameStatus {
  waiting = "waiting",
  running = "running",
  ended = "ended",
}

export interface CellData {
  hasFlag: boolean;
  hasMine: boolean;
  minesSurroundCount: number;
  isOpened: boolean;
  rowIndex: number;
  colIndex: number;
  id: string;
}

export type Row = Array<CellData>;

export type Board = Array<Row>;
