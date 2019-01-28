import React from 'react';
import User from '../UserEnum';
import './Board.scss';

const Board = ({ boardData, boardPlay}) => {
  const renderBoardSpaces = (array) => {
    return array.map((row, rowIdx) => {
      return row.map((coinInColumn, columnIdx) => {
        let coin = null;
        if (coinInColumn === User.COMPUTER) {
          coin = (
            <>
              <div className='coin--computer' />
              <div className='coin--computer-border' />
            </>
          )
        } else if (coinInColumn === User.HUMAN) {
          coin = (
            <>
              <div className='coin--human' />
              <div className='coin--human-border' />
            </>
          )
        }
        return (
          <div 
            className='coin' 
            key={rowIdx + ',' + columnIdx} 
            onClick={() => boardPlay(rowIdx, columnIdx)}
          >
            <div className='coin-position'>{`[${rowIdx}, ${columnIdx}]`} </div>
            {coin}
          </div>
        )
      })
    })
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