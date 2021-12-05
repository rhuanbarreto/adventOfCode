const { boards, numbersDrawn } = require("./day04input");

// const boards = [
//   [
//     [22, 13, 17, 11, 0],
//     [8, 2, 23, 4, 24],
//     [21, 9, 14, 16, 7],
//     [6, 10, 3, 18, 5],
//     [1, 12, 20, 15, 19],
//   ],
//   [
//     [3, 15, 0, 2, 22],
//     [9, 18, 13, 17, 5],
//     [19, 8, 7, 25, 23],
//     [20, 11, 10, 24, 4],
//     [14, 21, 16, 12, 6],
//   ],
//   [
//     [14, 21, 17, 24, 4],
//     [10, 16, 15, 9, 19],
//     [18, 8, 23, 26, 20],
//     [22, 11, 13, 6, 5],
//     [2, 0, 12, 3, 7],
//   ],
// ];

// const numbersDrawn = [
//   7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
//   20, 8, 19, 3, 26, 1,
// ];

const emptyLine = Array(5).fill(0);
const emptyBoard = Array(5).fill(emptyLine);
const markedBoards = JSON.parse(
  JSON.stringify(Array(boards.length).fill(emptyBoard))
);

const markBoard = (numberDrawn, filledBoard, markedBoard) => {
  filledBoard.forEach((row, i) => {
    row.forEach((num, j) => {
      if (num === numberDrawn) markedBoard[i][j] = 1;
    });
  });
};

const fullRow = (row) => row.reduce((prev, curr) => prev + curr, 0) === 5;

const fullColumn = (board, columnIndex) =>
  board.reduce((prev, row) => prev + row[columnIndex], 0) === 5;

const boardWin = (markedBoard) => {
  if (markedBoard.some((row) => fullRow(row))) return true;
  if (markedBoard.some((_row, i) => fullColumn(markedBoard, i))) return true;
  return false;
};

const sumUnmarkedRow = (row, markedRow) =>
  row.reduce((prev, num, i) => prev + (markedRow[i] ? 0 : num), 0);

const sumUnmarkedBoard = (board, markedBoard) =>
  board.reduce((prev, row, i) => prev + sumUnmarkedRow(row, markedBoard[i]), 0);

const calculate = () => {
  let boardWon, markedBoardWon, numberCalled;

  numbersDrawn.forEach((numberDrawn) => {
    if (boardWon) return;
    boards.forEach((board, i) => {
      if (boardWon) return;
      markBoard(numberDrawn, board, markedBoards[i]);
      if (boardWin(markedBoards[i])) {
        boardWon = board;
        markedBoardWon = markedBoards[i];
        numberCalled = numberDrawn;
      }
    });
  });

  if (!(boardWon && markedBoardWon && numberCalled))
    throw new Error("Some problem!");
  const sumUM = sumUnmarkedBoard(boardWon, markedBoardWon);
  return sumUM * numberCalled;
};

// console.time("Execution");
// calculate();
// console.timeEnd("Execution");

const calculate2 = () => {
  let boardsWon = Array(boards.length).fill(false);
  let boardWon, markedBoardWon, numberCalled;

  numbersDrawn.forEach((numberDrawn) => {
    if (boardsWon.every(Boolean)) return;
    boards.forEach((board, i) => {
      if (boardsWon.every(Boolean)) return;
      markBoard(numberDrawn, board, markedBoards[i]);
      if (boardWin(markedBoards[i])) {
        boardsWon[i] = true;
        boardWon = board;
        markedBoardWon = markedBoards[i];
        numberCalled = numberDrawn;
      }
    });
  });

  if (!(boardWon && markedBoardWon && numberCalled))
    throw new Error("Some problem!");
  const sumUM = sumUnmarkedBoard(boardWon, markedBoardWon);
  return sumUM * numberCalled;
};

console.time("Execution");
console.log(calculate2());
console.timeEnd("Execution");