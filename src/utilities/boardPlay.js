import User from '../UserEnum';

export const generateBoard = () => {
  let boardMap = [];
  for (var row = 0; row < 6; row++) {
    boardMap.push([]);
    for (var column = 0; column < 7; column++) {
      boardMap[row].push(User.EMPTY);
    }
  }
  return boardMap;
}

export const calculateDistance = (array) => {
  let distanceTracker = {};
  for (let i = 1; i < array.length; i++) {
    let distance = (array[i] - array[i - 1]);

    // resets object if after non-consecutive positions 
    if (distanceTracker[1] && distance !== 1) {
      distanceTracker = {};
    }

    distanceTracker[distance] = (
      distanceTracker.hasOwnProperty(distance) 
        ? distanceTracker[distance] + 1 
        : 1
    );
  }
  return distanceTracker;
}

export const are4CoinsAdjacent = (object) => {
  if (object[1] >= 3) {
    return true;
  }
  return false;
}

export const checkRowForMatchingCoins = (board, currentPlayer) => {
  return board.some((row, rowIdx) => {
    let coinsForPlayer = [];
    row.forEach((coinPosition, coinIdx) => {
      if (coinPosition === currentPlayer) {
        coinsForPlayer.push(coinIdx);
      }
    })
    if (coinsForPlayer.length >= 4) {
      let distances = calculateDistance(coinsForPlayer);
      return are4CoinsAdjacent(distances);
    }
    return false;
  })
}

export const generateBoardByColumn = (board) => {
  let columnFirstBoard = [];
    for (var column = 0; column < 7; column++) {
      columnFirstBoard.push([]) // new row
      
      // fill row with column data
      for (var row = 0; row < 6; row++ ) {
        columnFirstBoard[column].push(board[row][column])
      }
    }
    return columnFirstBoard;
}

export const generateBoardByDiagonal = (board) => {
  let diagonalsToCheck = [
    [[3,0], [0,3]],
    [[4,0], [0,4]],
    [[5,0], [0,5]],
    [[5,1], [0,6]],
    [[5,2], [1,6]],
    [[5,3], [2,6]],

    [[5,3], [2,0]],
    [[5,4], [1,0]],
    [[5,5], [0,0]],
    [[5,6], [0,1]],
    [[4,6], [0,2]],
    [[3,6], [0,3]],
  ];
  let diagonalBoard = [];
  diagonalsToCheck.forEach((diagonal, diagonalIdx) => {
    diagonalBoard.push([]);

    let beginRow = diagonal[0][0];
    let beginColumn = diagonal[0][1];
    let endRow = diagonal[1][0];
    let endColumn = diagonal[1][1];

    let iterationLength = Math.abs(beginRow - endRow) + 1;
    // generate the diagonal positions
    for (var i = 0; i < iterationLength; i++) {
      // decide whether column and row position increments or decrements
      // by looking at the difference between the original row and columns
      let column = endColumn - beginColumn > 0 ? beginColumn + i : beginColumn - i;
      let row = endRow - beginRow > 0 ? beginRow + i : beginRow - i;
      diagonalBoard[diagonalIdx].push(board[row][column])
    }
  })
  return diagonalBoard;
}