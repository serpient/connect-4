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
  let currentPosition;
  let distanceTracker = {};
  for (let i = 0; i < array.length; i++) {
    if (!currentPosition) {
      currentPosition = array[i];
      i++;
    }
    let distance = (array[i] - currentPosition);
    distanceTracker[distance] = (
      distanceTracker.hasOwnProperty(distance) 
        ? distanceTracker[distance] + 1 
        : 1
    );
    currentPosition = array[i];
  }
  return distanceTracker;
}

export const are4CoinsAdjacent = (object) => {
  for (let key in object) {
    if ((key == 0 || key == 1) && object[key] >= 3) {
      return true;
    }
  }
  return false;
}

export const checkRowForMatchingCoins = (board, currentPlayer) => {
  let isAWin = false;
  board.forEach((row, rowIdx) => {
    let coinsForPlayer = [];
    row.forEach((coinPosition, coinIdx) => {
      if (coinPosition === currentPlayer) {
        coinsForPlayer.push(coinIdx);
      }
      if (coinsForPlayer.length >= 4 && coinIdx === row.length - 1) {
        let distanceObj = calculateDistance(coinsForPlayer);
        isAWin = are4CoinsAdjacent(distanceObj);
      }
    })
  })
  return isAWin;
}

export const generateBoardByColumn = (board) => {
  let columnFirstBoard = [];
    for (var column = 0; column < 7; column++) {
      columnFirstBoard.push([]) // new column
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
    for (var i = 0; i < beginRow - endRow + 1; i++) {
      let column = endColumn - beginColumn > 0 ? beginColumn + i : beginColumn - i;
      diagonalBoard[diagonalIdx].push(board[beginRow - i][column])
    }
  })
  return diagonalBoard;
}