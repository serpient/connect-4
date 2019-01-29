import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { 
  generateBoard, 
  checkRowForMatchingCoins,
  generateBoardByColumn,
  generateBoardByDiagonal,
} from './utilities/boardPlay';
import { shallow, mount } from 'enzyme';
import User from './UserEnum';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('coins drop into bottom rows', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<App />);
  })
  it('player 1 drops coin into most bottom row', () => {
    wrapper.instance().boardPlay(0, 0);
    expect(wrapper.state('currentPlayer')).toEqual(User.HUMAN);
    expect(wrapper.state('boardData')[4][0]).toEqual(User.EMPTY);
    expect(wrapper.state('boardData')[5][0]).toEqual(User.HUMAN);
  })
  it('player 2 drops coin into most bottom row', () => {
    wrapper.instance().boardPlay(0, 0);
    setTimeout(() => {
      expect(wrapper.state('currentPlayer')).toEqual(User.COMPUTER);
      expect(wrapper.state('boardData')[5][0]).toEqual(User.HUMAN);
      expect(wrapper.state('boardData')[4][0]).toEqual(User.COMPUTER);
    }, 300)
  })
  it('player 1 can drop into another column if chosen is full', () => {
    wrapper.instance().boardPlay(0, 0);
    wrapper.instance().boardPlay(0, 0);
    wrapper.instance().boardPlay(0, 0);
    wrapper.instance().boardPlay(0, 0);
    wrapper.instance().boardPlay(0, 0);
    setTimeout(() => {
      expect(wrapper.state('currentPlayer')).toEqual(User.HUMAN);
      expect(wrapper.state('boardData')[5][0]).toEqual(User.HUMAN);
      expect(wrapper.state('boardData')[4][0]).toEqual(User.COMPUTER);
      expect(wrapper.state('boardData')[3][0]).toEqual(User.HUMAN);
      expect(wrapper.state('boardData')[2][0]).toEqual(User.COMPUTER);
      expect(wrapper.state('boardData')[1][0]).toEqual(User.HUMAN);
      expect(wrapper.state('boardData')[0][0]).toEqual(User.COMPUTER);
      expect(wrapper.state('currentPlayer')).toEqual(User.HUMAN);
      expect(wrapper.state('gameMessage')).toEqual('Please select another column');
    }, 300)
  })
  it('game will wait for player 1 to drop another coin in another column', () => {
    expect(wrapper.state('currentPlayer')).toEqual(User.HUMAN);
    wrapper.instance().boardPlay(0, 1);
    setTimeout(() => {
      expect(wrapper.state('boardData')[5][1]).toEqual(User.HUMAN);
      expect(wrapper.state('currentPlayer')).toEqual(User.COMPUTER);
      expect(wrapper.state('gameMessage')).toEqual(`Please select a coin spot`);
    }, 300)
  })
})



// check for win (horizontal, diagonal, vertical)

// check for no possible spaces left (tie)

// row checker
// adjacent are true
// interleaven coins are false

// diagonal checker

// horizontal checker

// diagonal board creator is correct

// column board creator is correct