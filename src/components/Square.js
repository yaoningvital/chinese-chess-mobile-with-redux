import React from 'react'
import { isAbleReceiveOrNot } from '../utils'

function Square (props) {
  let {
    data, squareWidth, handleClickChess, index, currentChessIndex,
    layout, ableReceiveIndices, history, winnerSide, handleMoveChess
  } = props
  let chessColor = '#9a1f00'
  if (data && data.side === 1) {
    chessColor = '#242223'
  }
  
  let chessWidth = squareWidth * 0.9  // 棋子的宽度
  let chessFontSize = squareWidth * 0.5
  let chessBoxShadow = '0 1px 1px 0 rgba(0, 0, 0, 0.3)'
  // 点击棋子时，棋子要放大显示
  if (index && currentChessIndex &&
    index[0] === currentChessIndex[0] &&
    index[1] === currentChessIndex[1]) {
    chessWidth = squareWidth
    chessFontSize = squareWidth * 0.6
    chessBoxShadow = '0 1px 1px 0px rgba(0, 0, 0, 0.3)'
  }
  
  let isAbleReceive = false
  if (index && ableReceiveIndices) {
    isAbleReceive = isAbleReceiveOrNot(ableReceiveIndices, index) // 当前位置是不是一个落子点
  }
  
  
  return (
    <div className="square"
         style={{
           width: squareWidth + 'px',
           height: squareWidth + 'px',
         }}
         onClick={() => handleMoveChess(isAbleReceive, index, history, currentChessIndex)}
    >
      {
        data &&
        <button className="chess"
                style={{
                  width: chessWidth + 'px',
                  height: chessWidth + 'px',
                  borderRadius: chessWidth + 'px',
                  fontSize: chessFontSize + 'px',
                  color: chessColor,
                  backgroundSize: `${chessWidth}px  ${chessWidth}px`,
                  boxShadow: chessBoxShadow
                }}
                onClick={() => handleClickChess(index, layout, data, history, winnerSide)}
        >
          {data.name}
        </button>
      }
      {/*落子点的绿色点*/}
      {
        isAbleReceive &&
        <div className="green-dot"/>
      }
    </div>
  )
}

export default Square