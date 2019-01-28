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

  addCoinToBoard = (rowIdx, columnIdx) => {
    let { boardData, currentPlayer } = this.state;
    for (var row = 5; row >= 0; row--) {
      if (boardData[row][columnIdx] === User.EMPTY) {
        boardData[row][columnIdx] = currentPlayer;
        this.togglePlayer();
        return;
      }
      if (row === 5 && boardData[row][columnIdx] !== User.EMPTY) {
        // if no empty spots, tell user to select another column
        return this.setState({ gameMessage: this.columnIsFullMessage });
      }
    }
  }

  render() {
    let { boardData, gameMessage, currentPlayer } = this.state;
    let currentPlayerDescription = currentPlayer === User.HUMAN ? 'Player 1' : 'Player 2';
    return (
      <div className="App">
        {`${currentPlayerDescription}, ${gameMessage}.`}
        <Board addCoinToBoard={this.addCoinToBoard} boardData={boardData} />
      </div>
    );
  }
}

export default App;
