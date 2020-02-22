import React from 'react'
import Board from './Board'

function Game (props) {
  let {history} = props
  let currentLayout = history[history.length - 1].layout
  let scale = 0.9
  let squareWidth = document.body.clientWidth * scale / 9
  return (
    <div className="game">
      {/*游戏名称*/}
      <div className="game-name">
        <h4>中国象棋</h4>
      </div>
      <Board layout={currentLayout}
             squareWidth={squareWidth}
             scale={scale}
      />
    </div>
  )
}

export default Game