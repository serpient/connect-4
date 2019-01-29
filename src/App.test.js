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

describe('win game by horizontal matches', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  })
  it('wins game with 4 adjacent coins', () => {
    const board = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,1,1,1,1,0,0],
    ];
    wrapper.setState({ boardData: board });
    wrapper.update();
    setTimeout(() => {
      expect(wrapper.state('playWinAnimation')).toEqual(true);
    }, 300)
  })
  it('does NOT game with 4 adjacent coins on different rows', () => {
    const board = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,1,0,0,0],
      [0,1,1,0,1,0,0],
    ];
    wrapper.setState({ boardData: board });
    wrapper.update();
    setTimeout(() => {
      expect(wrapper.state('playWinAnimation')).toEqual(false);
    }, 300)
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
      [0,1,0,0,0,0,0],
      [0,1,0,0,0,0,0],
      [0,1,0,0,0,0,0],
      [0,1,0,0,0,0,0],
      [0,0,0,0,0,0,0],
    ];
    wrapper.setState({ boardData: board });
    wrapper.update();
    setTimeout(() => {
      expect(wrapper.state('playWinAnimation')).toEqual(true);
    }, 300)
  })
  it('does NOT game with 4 adjacent coins on different columns', () => {
    const board = [
      [0,0,0,0,0,0,0],
      [0,0,1,0,0,0,0],
      [0,0,0,1,0,0,0],
      [0,0,1,0,0,0,0],
      [0,0,1,0,0,0,0],
      [0,0,0,0,0,0,0],
    ];
    wrapper.setState({ boardData: board });
    wrapper.update();
    setTimeout(() => {
      expect(wrapper.state('playWinAnimation')).toEqual(false);
    }, 300)
  })
})

describe('win game by diagonal matches', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  })
  it('wins game with 4 adjacent coins - #1', () => {
    const board = [
      [0,0,0,1,0,0,0],
      [0,0,1,0,0,0,0],
      [0,1,0,0,0,0,0],
      [1,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
    ];
    wrapper.setState({ boardData: board });
    wrapper.update();
    setTimeout(() => {
      expect(wrapper.state('playWinAnimation')).toEqual(true);
    }, 300)
  })
  it('wins game with 4 adjacent coins - #2', () => {
    const board = [
      [0,0,0,0,0,0,0],
      [0,0,1,0,0,0,0],
      [0,0,0,1,0,0,0],
      [0,0,0,0,1,0,0],
      [0,0,0,0,0,1,0],
      [0,0,0,0,0,0,0],
    ];
    wrapper.setState({ boardData: board });
    wrapper.update();
    setTimeout(() => {
      expect(wrapper.state('playWinAnimation')).toEqual(true);
    }, 300)
  })
  it('does NOT game with 4 adjacent coins on different columns', () => {
    const board = [
      [0,0,0,0,1,0,0],
      [0,0,0,1,0,0,0],
      [0,0,1,0,0,0,0],
      [0,0,0,0,0,0,0],
      [1,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
    ];
    wrapper.setState({ boardData: board });
    wrapper.update();
    setTimeout(() => {
      expect(wrapper.state('playWinAnimation')).toEqual(false);
    }, 300)
  })
})

describe('game is a tie when all the spaces are filled', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  })
  it('spaces filled up is a tie', () => {
    const board = [
      [2,1,1,2,1,1,2],
      [1,2,2,1,2,2,1],
      [2,1,1,2,1,1,2],
      [1,2,2,1,2,2,1],
      [2,1,1,2,1,1,2],
      [1,2,2,1,2,2,1],
    ];
    wrapper.setState({ boardData: board });
    wrapper.update();
    setTimeout(() => {
      expect(wrapper.state('playWinAnimation')).toEqual(false);
      expect(wrapper.state('gameMessage')).toEqual('This game is a tie');
    }, 300)
  })
})