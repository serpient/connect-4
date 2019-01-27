import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// with every turn, the current player keeps track of who goes next

// when clicking a spot, a coin will drop into the most bottom row of that column

// check the number of turns and how many rendered coins are on the board (should match)

// clicking a column that is full will output message to click another empty column. but will not do anything

// when checking for player coins, it accurately parses the right amount of empty, player 1, player 2

// check for win (horizontal, diagonal, vertical)

// check for no possible spaces left (tie)