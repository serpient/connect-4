import React, { Component } from 'react';
import './App.scss';

const generateBoard = () => {
  let boardMap = new Map();
  for (var i = 1; i < 7; i++) {
    for (var j = 1; j < 8; j++) {
      boardMap.set([i,j], null);
    }
  }
  return boardMap;
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: generateBoard(),
    }
  }
  render() {
    console.log(this.state.board)
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
