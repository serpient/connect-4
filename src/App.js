import React, { Component } from 'react';
import Board from './components/Board';
import './App.scss';
import User from './UserEnum';

const generateBoard = () => {
  let boardMap = [];
  for (var row = 0; row < 6; row++) {
    boardMap.push([]);
    for (var column = 0; column < 7; column++) {
      boardMap[row].push(User.EMPTY);
    }
  }
  return boardMap;
}
class App extends Component {
  constructor(props) {
    super(props);
    this.defaultMessage = `Please select a coin spot`;
    this.columnIsFullMessage = 'Please select another column';
    this.winMessage = 'You have won';
    this.tieMessage = 'This game is a tie';
    this.state = {
      boardData: generateBoard(),
      currentPlayer: User.HUMAN,
      gameMessage: `Please select a coin spot`,
    }
  }

  togglePlayer = () => {
    let { currentPlayer } = this.state;
    let newPlayer = currentPlayer === User.HUMAN ? User.COMPUTER : User.HUMAN;
    this.setState({ currentPlayer: newPlayer });
  }

  boardPlay = (rowIdx, columnIdx) => {
    let { boardData, currentPlayer } = this.state;
    this.addCoinToBoard(columnIdx);
    if (this.checkForTie(boardData)) {
      return this.setState({ gameMessage: this.tieMessage });
    }
    let playerWins = this.checkBoard(boardData, currentPlayer);
    playerWins && this.setState({ gameMessage: this.winMessage })
  }

  checkForTie = (boardData) => {
    let emptyCoins = [];
    boardData.forEach((row, rowIdx) => {
      row.forEach((coin, coinIdx) => {
        if (coin === User.EMPTY) {
          emptyCoins.push(coin);
        }
      })
    }) 
    return emptyCoins.length === 0;
  }

  addCoinToBoard = (columnIdx) => {
    let { boardData, currentPlayer } = this.state;
    this.setState({ gameMessage: this.defaultMessage });
    for (var row = 5; row >= 0; row--) {
      if (row === 0 && boardData[row][columnIdx] !== User.EMPTY) {
        // if no empty spots, tell user to select another column
        return this.setState({ gameMessage: this.columnIsFullMessage });
      } else if (boardData[row][columnIdx] === User.EMPTY) {
        boardData[row][columnIdx] = currentPlayer;
        this.togglePlayer();
        return;
      } 
    }
  }

  calculateDistance = (array) => {
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

  are4CoinsAdjacent = (object) => {
    for (let key in object) {
      if ((key == 0 || key == 1) && object[key] >= 3) {
        return true;
      }
    }
    return false;
  }

  checkWinByRow = (board, currentPlayer) => {
    let isAWin = false;
    board.forEach((row, rowIdx) => {
      let coinsForPlayer = [];
      row.forEach((coinPosition, coinIdx) => {
        if (coinPosition === currentPlayer) {
          coinsForPlayer.push(coinIdx);
        }
        if (coinsForPlayer.length >= 4 && coinIdx === row.length - 1) {
          let distanceObj = this.calculateDistance(coinsForPlayer);
          isAWin = this.are4CoinsAdjacent(distanceObj);
        }
      })
    })
    return isAWin;
  }

  checkWinByColumn = (board, currentPlayer) => {
    let columnFirstBoard = [];
    for (var column = 0; column < 7; column++) {
      columnFirstBoard.push([]) // new column
      for (var row = 0; row < 6; row++ ) {
        columnFirstBoard[column].push(board[row][column])
      }
    }
    return this.checkWinByRow(columnFirstBoard, currentPlayer);
  }

  checkWinByDiagonals = (board, currentPlayer) => {

  }

  checkBoard = (board, currentPlayer) => {
    let row = this.checkWinByRow(board, currentPlayer);
    console.log('row win=' + row);
    let column = this.checkWinByColumn(board, currentPlayer);
    console.log('column win=' + column);
    let diagonal = this.checkWinByDiagonals(board, currentPlayer);
    return row || column || diagonal;
  }

  render() {
    let { boardData, gameMessage, currentPlayer } = this.state;
    let currentPlayerDescription = currentPlayer === User.HUMAN ? 'Player 1' : 'Player 2';
    return (
      <div className="App">
        <h1 className='game-message'>
          {`${currentPlayerDescription}, ${gameMessage}.`}
        </h1>
        <Board boardPlay={this.boardPlay} boardData={boardData} />
      </div>
    );
  }
}

export default App;
