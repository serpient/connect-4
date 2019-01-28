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
    this.checkBoard(boardData, currentPlayer);
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
      if (distanceTracker.hasOwnProperty(distance)) {
        distanceTracker[distance] = distanceTracker[distance] + 1;
      } else {
        distanceTracker[distance] = 1;
      }
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

  checkRow = (board, currentPlayer) => {
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

  checkBoard = (board, currentPlayer) => {
    let row = this.checkRow(board, currentPlayer);
    console.log(row);
  }

  // checkBoard = (board, currentPlayer) => {
  //   console.log(currentPlayer === User.HUMAN ? 'yellow player' : 'purple player')
  //   let { humanCoins, computerCoins } = this.parseBoard(board);
  //   let coinsToCheck = currentPlayer === User.COMPUTER ? computerCoins : humanCoins;
  //   console.log(coinsToCheck);
  //   let victories = [];
  //   coinsToCheck.forEach((row, rowIdx) => {
  //     row.forEach(coinPositions => {
  //       let rowPositions = [];
  //       let columnPositions = [];
  //       rowPositions.push(coinPositions[0]);
  //       columnPositions.push(coinPositions[1]);
  //       let rowDistance = this.calculateDistance(rowPositions);
  //       let columnDistance = this.calculateDistance(columnPositions);
  //       console.log({ rowDistance, columnDistance })
  //     })
  //   })

  //   if (rowDistance === 0 && columnDistance === 1) {
  //     // horz/vertical win
  //     console.log(currentPlayer + ' wins')
  //     return true;
  //   } else if (rowDistance === 1 && columnDistance === 0) {
  //     // horz/vertical win
  //     console.log(currentPlayer + ' wins')
  //     return true;
  //   } else if (rowDistance === 1 && columnDistance === 1) {
  //     // diagonal win
  //     console.log(currentPlayer + ' wins');
  //     return true;
  //   } 
  //   return false;
  // }

  render() {
    let { boardData, gameMessage, currentPlayer } = this.state;
    let currentPlayerDescription = currentPlayer === User.HUMAN ? 'Player 1' : 'Player 2';
    return (
      <div className="App">
        {`${currentPlayerDescription}, ${gameMessage}.`}
        <Board boardPlay={this.boardPlay} boardData={boardData} />
      </div>
    );
  }
}

export default App;
