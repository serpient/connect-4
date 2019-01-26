import React from 'react';
import User from '../UserEnum';
import './Board.scss';

const Board = ({ boardData }) => {
  const renderBoardSpaces = (mapObject) => {
    let coinArray = [];
    for (var value of mapObject.values()) {
      if (value === User.COMPUTER) {
        coinArray.push(<div className='coin'>
          <div className='coin--computer' />
          <div className='coin--computer-border' />
        </div>)
      } else if (value === User.HUMAN) {
        coinArray.push(<div className='coin'>
          <div className='coin--human' />
          <div className='coin--human-border' />
        </div>)
      } else {
        coinArray.push(<div className='coin' />)
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