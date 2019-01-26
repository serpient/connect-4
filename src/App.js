import React, { Component } from 'react';
import Board from './components/Board';
import './App.scss';
import User from './UserEnum';

const generateBoard = () => {
  let boardMap = new Map();
  for (var i = 1; i < 7; i++) {
    for (var j = 1; j < 8; j++) {
      boardMap.set([i,j], User.EMPTY);
    }
  }
  return boardMap;
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardData: generateBoard(),
    }
  }
  render() {
    let { boardData } = this.state;
    return (
      <div className="App">
        <Board boardData={boardData} />
      </div>
    );
  }
}

export default App;
