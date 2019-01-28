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
      playWinAnimation: false,
    }
  }

  resetGame = () => {
    this.setState({ 
      boardData: generateBoard(), 
      gameMessage: this.defaultMessage,
      currentPlayer: User.HUMAN,
      playWinAnimation: false,
    });
  }

  togglePlayer = () => {
    let { currentPlayer } = this.state;
    let newPlayer = currentPlayer === User.HUMAN ? User.COMPUTER : User.HUMAN;
    this.setState({ currentPlayer: newPlayer });
  }

  boardPlay = (rowIdx, columnIdx) => {
    let { boardData, currentPlayer } = this.state;

    let successfulCoinDrop = this.addCoinToBoard(columnIdx);
    if (!successfulCoinDrop) {
      return;
    }

    if (this.checkForTie(boardData)) {
      return this.setState({ gameMessage: this.tieMessage });
    }

    if (this.checkBoard(boardData, currentPlayer)) {
      this.setState({ 
        gameMessage: this.winMessage,
        playWinAnimation: true, 
      })
    } else {
      setTimeout(() => { this.togglePlayer() }, 300)
    }
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
        this.setState({ gameMessage: this.columnIsFullMessage });
        return false;
      } else if (boardData[row][columnIdx] === User.EMPTY) {
        boardData[row][columnIdx] = currentPlayer;
        return true;
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
    let { boardData, gameMessage, currentPlayer,playWinAnimation } = this.state;
    let player = currentPlayer === User.HUMAN ? 'human' : 'computer';
    let currentPlayerDescription = currentPlayer === User.HUMAN ? 'Player 1' : 'Player 2';
    return (
      <div className="App">
        { playWinAnimation 
          ? <WinAnimation currentPlayer={currentPlayer} />
          : <h1 className={`game-message player--${player}`}>
              {`${currentPlayerDescription}, ${gameMessage}.`}
            </h1>
        }
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

const WinAnimation = ({currentPlayer}) => {
  let player = currentPlayer === User.HUMAN ? 'human' : 'computer';
  let playerDescription = currentPlayer === User.HUMAN ? 'Player 1' : 'Player 2';
  return (
    <div className='game-win'>
      <div className={`coin--${player}`} />
      <div className={`coin--${player}-border`} />
      <div className={`game-win--text game-message player--${player}`}>
        {playerDescription} Wins!
      </div>
    </div> 
  )
}

export default App;
