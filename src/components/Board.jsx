import React from 'react';
import User from '../UserEnum';
import './Board.scss';

const Board = ({ boardData }) => {
  const renderBoardSpaces = (mapObject) => {
    let coinArray = [];
    for (var value of mapObject.values()) {
      if (value === User.COMPUTER) {
        coinArray.push(<div className='card card--computer'>C</div>)
      } else if (value === User.HUMAN) {
        coinArray.push(<div className='card card--human'>H</div>)
      } else {
        coinArray.push(<div className='card' />)
      }
    }
    return coinArray;
  }

  return (
    <section className='board-container'>
      <div className='board-spaces'>
        {renderBoardSpaces(boardData)}
      </div>
    </section>
  )
}

export default Board;