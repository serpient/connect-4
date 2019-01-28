import React, { Component } from 'react';
import Board from './components/Board';
import './App.scss';
import User from './UserEnum';
import { 
  generateBoard, 
  checkRowForMatchingCoins,
  generateBoardByColumn,
  generateBoardByDiagonal,
} from './utilities/boardPlay';

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

  resetGame = () => {
    this.setState({ 
      boardData: generateBoard(), 
      gameMessage: this.defaultMessage,
      currentPlayer: User.HUMAN,
    });
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

  checkWinByRow = (board, currentPlayer) => {
    return checkRowForMatchingCoins(board, currentPlayer);
  }

  checkWinByColumn = (board, currentPlayer) => {
    let columnBoard = generateBoardByColumn(board);
    return this.checkWinByRow(columnBoard, currentPlayer);
  }

  checkWinByDiagonals = (board, currentPlayer) => {
    let diagonalBoard = generateBoardByDiagonal(board);
    return this.checkWinByRow(diagonalBoard, currentPlayer);
  }

  checkBoard = (board, currentPlayer) => {
    let row = this.checkWinByRow(board, currentPlayer);
    let column = this.checkWinByColumn(board, currentPlayer);
    let diagonal = this.checkWinByDiagonals(board, currentPlayer);
    console.log({ row, column, diagonal });
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
        <button
          type='button'
          className='reset-btn'
          onClick={() => this.resetGame()}
        >
          Reset Game
        </button>
      </div>
    );
  }
}

export default App;
