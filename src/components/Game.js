import React from 'react'
import Board from './Board'
import Square from "./Square";
import JiangJunAudio from '../assets/audio/jiangjun.mp3'

function Game (props) {
  let {
    history, handleClickChess, currentChessIndex, ableReceiveIndices,
    winnerSide, handleMoveChess, replay, goBack,
  } = props
  let currentLayout = history[history.length - 1].layout
  let scale = 0.9
  let squareWidth = document.body.clientWidth * scale / 9
  
  let nextSide = history[history.length - 1].nextSide
  let nextPlayerData = {side: 0, role: 'jiang', name: '帥'}
  if (nextSide === 1) {
    nextPlayerData = {side: 1, role: 'jiang', name: '將'}
  }
  
  let winnerPlayerData = null
  if (winnerSide === 0) {
    winnerPlayerData = {side: 0, role: 'jiang', name: '帥'}
  } else if (winnerSide === 1) {
    winnerPlayerData = {side: 1, role: 'jiang', name: '將'}
  }
  
  return (
    <div className="game">
      {/*游戏名称*/}
      <div className="game-name">
        <h4>中国象棋</h4>
      </div>
      
      {/*游戏状态*/}
      {
        (winnerSide !== 0 && winnerSide !== 1) &&
        <div className="status">
          <span>下一步：</span>
          <Square data={nextPlayerData}
                  squareWidth={squareWidth}
          />
        </div>
      }
      
      {/*赢家是*/}
      {
        (winnerSide === 0 || winnerSide === 1) &&
        <div className="winner">
          <span>赢家是：</span>
          <Square data={winnerPlayerData}
                  squareWidth={squareWidth}
          />
        </div>
      }
      
      {/*棋盘*/}
      <Board layout={currentLayout}
             squareWidth={squareWidth}
             scale={scale}
             handleClickChess={handleClickChess}
             currentChessIndex={currentChessIndex}
             ableReceiveIndices={ableReceiveIndices}
             history={history}
             winnerSide={winnerSide}
             handleMoveChess={handleMoveChess}
      />
      
      {/*按钮：返回上一步、重玩*/}
      <div className="btn-area">
        <button onClick={goBack}>
          返回上一步
        </button>
        <button onClick={replay}>
          重玩
        </button>
      </div>
      
      {/*  将军的音频*/}
      <audio src={JiangJunAudio} id="jiang-jun">
        您的浏览器不支持 audio 标签。
      </audio>
    </div>
  )
}

export default Game