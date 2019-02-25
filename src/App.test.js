import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount } from 'enzyme';
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
    expect(wrapper.state('currentPlayer')).toEqual(User.COMPUTER);
    expect(wrapper.state('boardData')[4][0]).toEqual(User.EMPTY);
    expect(wrapper.state('boardData')[5][0]).toEqual(User.HUMAN);
  })
  it('player 2 drops coin into most bottom row', () => {
    wrapper.instance().boardPlay(0, 0);
    expect(wrapper.state('currentPlayer')).toEqual(User.HUMAN);
    expect(wrapper.state('boardData')[4][0]).toEqual(User.COMPUTER);
    expect(wrapper.state('boardData')[5][0]).toEqual(User.HUMAN);
  })
  it('player 1 can drop into another column if chosen is full', () => {
    wrapper.instance().boardPlay(0, 0);
    wrapper.instance().boardPlay(0, 0);
    wrapper.instance().boardPlay(0, 0);
    wrapper.instance().boardPlay(0, 0);
    wrapper.instance().boardPlay(0, 0);
    expect(wrapper.state('currentPlayer')).toEqual(User.HUMAN);
    expect(wrapper.state('boardData')[5][0]).toEqual(User.HUMAN);
    expect(wrapper.state('boardData')[4][0]).toEqual(User.COMPUTER);
    expect(wrapper.state('boardData')[3][0]).toEqual(User.HUMAN);
    expect(wrapper.state('boardData')[2][0]).toEqual(User.COMPUTER);
    expect(wrapper.state('boardData')[1][0]).toEqual(User.HUMAN);
    expect(wrapper.state('boardData')[0][0]).toEqual(User.COMPUTER);
    expect(wrapper.state('currentPlayer')).toEqual(User.HUMAN);
    expect(wrapper.state('gameMessage')).toEqual('Please select another column');
  })
  it('game will wait for player 1 to drop another coin in another column', () => {
    expect(wrapper.state('currentPlayer')).toEqual(User.HUMAN);
    wrapper.instance().boardPlay(0, 1);
    expect(wrapper.state('boardData')[5][1]).toEqual(User.HUMAN);
    expect(wrapper.state('currentPlayer')).toEqual(User.COMPUTER);
    expect(wrapper.state('gameMessage')).toEqual(`Please select a coin spot`);
  })
})

describe('coins drop into bottom rows', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<App />);
  })
  it('double clicking column doesnt allow 2 coins for that player', () => {
    wrapper.instance().boardPlay(0, 0);
    wrapper.instance().boardPlay(0, 0);
    expect(wrapper.state('currentPlayer')).toEqual(User.HUMAN);
    expect(wrapper.state('boardData')[4][0]).toEqual(User.COMPUTER);
    expect(wrapper.state('boardData')[5][0]).toEqual(User.HUMAN);
  })
})

describe('win game by horizontal matches', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  })
  afterEach(() => {
    wrapper.unmount();
  })
  it('wins game with 4 adjacent coins', () => {
    const board = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,2,2,2,0,0,0],
      [0,1,1,1,0,0,0],
    ];
    wrapper.setState({ boardData: board, currentPlayer: User.HUMAN });
    wrapper.update();
    wrapper.instance().boardPlay(5, 4);
    wrapper.update();
    expect(wrapper.state('playWinAnimation')).toEqual(true);
    expect(wrapper.state('currentPlayer')).toEqual(User.HUMAN);
  })
  it('wins game with 4 adjacent coins', () => {
    const board = [
      [0,1,1,1,2,2,2],
      [1,2,1,2,1,2,1],
      [2,2,1,2,1,2,1],
      [1,1,2,1,2,1,2],
      [2,1,2,1,2,1,2],
      [1,2,1,2,1,2,1],
    ];
    wrapper.setState({ boardData: board, currentPlayer: User.HUMAN });
    wrapper.update();
    wrapper.instance().boardPlay(0,0);
    wrapper.update();
    expect(wrapper.state('playWinAnimation')).toEqual(true);
    expect(wrapper.state('currentPlayer')).toEqual(User.HUMAN);
  })
  it('does NOT win game with adjacent coins', () => {
    const board = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [2,2,2,0,2,0,0],
      [1,1,1,0,1,0,0]
    ];
    wrapper.setState({ boardData: board, currentPlayer: User.HUMAN });
    wrapper.update();
    wrapper.instance().boardPlay(5, 5);
    wrapper.update();
    expect(wrapper.state('playWinAnimation')).toEqual(false);
    expect(wrapper.state('currentPlayer')).toEqual(User.COMPUTER);
  })
  it('does NOT game with 4 adjacent coins on different rows', () => {
    const board = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,2,2,1,2,0,0],
      [0,1,1,2,1,0,0],
    ];
    wrapper.setState({ boardData: board, currentPlayer: User.HUMAN });
    wrapper.update();
    wrapper.instance().boardPlay(5, 5);
    wrapper.update();
    expect(wrapper.state('playWinAnimation')).toEqual(false);
    expect(wrapper.state('currentPlayer')).toEqual(User.COMPUTER);
  })
})

describe('win game by vertical matches', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  })
  it('wins game with 4 adjacent coins', () => {
    const board = [
      [0,0,0,0,0,0,0],
      [1,0,0,0,0,0,0],
      [2,2,0,0,0,0,0],
      [1,2,0,0,0,0,0],
      [1,2,0,0,0,0,0],
      [1,1,0,0,0,0,0],
    ];
    wrapper.setState({ boardData: board, currentPlayer: User.COMPUTER });
    wrapper.update();
    wrapper.instance().boardPlay(1, 1);
    wrapper.update();
    expect(wrapper.state('playWinAnimation')).toEqual(true);
    expect(wrapper.state('currentPlayer')).toEqual(User.COMPUTER);
  })
  it('does NOT game with 4 adjacent coins on different columns', () => {
    const board = [
      [0,0,0,0,0,0,0],
      [0,0,1,0,0,0,0],
      [0,0,2,2,0,0,0],
      [0,2,1,1,0,0,0],
      [0,2,1,2,0,0,0],
      [0,2,1,1,0,0,0],
    ];
    wrapper.setState({ boardData: board, currentPlayer: User.HUMAN });
    wrapper.update();
    wrapper.instance().boardPlay(2, 1);
    wrapper.update();
    expect(wrapper.state('playWinAnimation')).toEqual(false);
    expect(wrapper.state('currentPlayer')).toEqual(User.COMPUTER);
  })
  it('does NOT game with 4 adjacent coins on different columns', () => {
    const board = [
      [0,0,0,0,0,0,0],
      [0,2,1,0,0,0,0],
      [0,1,2,0,0,0,0],
      [0,2,1,0,0,0,0],
      [0,2,1,0,0,0,0],
      [0,2,1,0,0,0,0],
    ];
    wrapper.setState({ boardData: board, currentPlayer: User.HUMAN });
    wrapper.update();
    wrapper.instance().boardPlay(0, 2);
    wrapper.update();
    expect(wrapper.state('playWinAnimation')).toEqual(false);
    expect(wrapper.state('currentPlayer')).toEqual(User.COMPUTER);
  })
})

describe('win game by diagonal matches', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  })
  it('wins game with 4 adjacent coins - #1', () => {
    const board = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,1,1,0,0,0],
      [0,1,1,2,0,0,0],
      [1,2,2,2,0,2,0],
    ];
    wrapper.setState({ boardData: board, currentPlayer: User.HUMAN });
    wrapper.update();
    wrapper.instance().boardPlay(2, 3);
    wrapper.update();
    expect(wrapper.state('playWinAnimation')).toEqual(true);
    expect(wrapper.state('currentPlayer')).toEqual(User.HUMAN);
  })
  it('wins game with 4 adjacent coins - #2', () => {
    const board = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,1,0,0],
      [0,0,0,2,2,1,0],
      [0,0,0,1,1,2,1],
      [0,0,0,2,2,1,2],
      [0,1,0,1,1,2,1],
    ];
    wrapper.setState({ boardData: board, currentPlayer: User.COMPUTER });
    wrapper.update();
    wrapper.instance().boardPlay(0, 3);
    wrapper.update();
    expect(wrapper.state('playWinAnimation')).toEqual(true);
    expect(wrapper.state('currentPlayer')).toEqual(User.COMPUTER);
  })
  it('wins game with 4 adjacent coins', () => {
    const board = [
      [0,1,0,0,0,0,0],
      [0,1,2,2,1,2,1],
      [2,2,1,1,1,2,1],
      [2,1,1,2,2,1,2],
      [1,2,2,1,1,2,1],
      [1,2,1,2,2,1,2],
    ];
    wrapper.setState({ boardData: board, currentPlayer: User.COMPUTER });
    wrapper.update();
    wrapper.instance().boardPlay(0, 3);
    wrapper.update();
    expect(wrapper.state('playWinAnimation')).toEqual(true);
    expect(wrapper.state('currentPlayer')).toEqual(User.COMPUTER);
  })
  it('wins game with 4 adjacent coins', () => {
    const board = [
      [0,1,0,0,0,0,0],
      [0,1,2,0,1,2,1],
      [2,2,1,1,1,2,1],
      [2,1,1,2,2,1,2],
      [1,2,2,1,1,2,1],
      [1,2,1,2,2,1,2],
    ];
    wrapper.setState({ boardData: board, currentPlayer: User.HUMAN });
    wrapper.update();
    wrapper.instance().boardPlay(0, 3);
    wrapper.update();
    expect(wrapper.state('playWinAnimation')).toEqual(true);
    expect(wrapper.state('currentPlayer')).toEqual(User.HUMAN);
  })
  it('does NOT game with 4 adjacent coins on different columns', () => {
    const board = [
      [0,0,0,0,0,0,0],
      [0,0,0,1,0,0,0],
      [0,0,1,0,0,0,0],
      [0,2,0,0,0,0,0],
      [1,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
    ];
    wrapper.setState({ boardData: board, currentPlayer: User.HUMAN });
    wrapper.update();
    wrapper.instance().boardPlay(0, 4);
    wrapper.update();
    expect(wrapper.state('playWinAnimation')).toEqual(false);
  })
})

describe('game is a tie when all the spaces are filled', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  })
  it('spaces filled up is a tie', () => {
    const board = [
      [2,0,1,2,1,1,2],
      [1,2,2,1,2,2,1],
      [2,1,1,2,1,1,2],
      [1,2,2,1,2,2,1],
      [2,1,1,2,1,1,2],
      [1,2,2,1,2,2,1],
    ];
    wrapper.setState({ boardData: board, currentPlayer: User.HUMAN });
    wrapper.update();
    wrapper.instance().boardPlay(0, 1);
    wrapper.update();
    expect(wrapper.state('playWinAnimation')).toEqual(false);
    expect(wrapper.state('gameMessage')).toEqual('This game is a tie');
  })
})