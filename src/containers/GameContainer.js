// import React from 'react'
import Game from '../components/Game'
import { connect } from 'react-redux'
import {
  addHistory,
  clearHistory,
  popHistory,
  setAbleReceiveIndices,
  setCurrentChessIndex,
  setWinnerSide
} from '../actions'
import { getAbleReceiveIndices, getAllAbleReceiveIndicesOfThisSide } from '../utils'
import _ from 'lodash'

const mapStateToProps = state => {
  return {
    history: state.history,
    currentChessIndex: state.currentChessIndex,
    ableReceiveIndices: state.ableReceiveIndices,
    winnerSide: state.winnerSide,
  }
}

const mapDispatchToProps = dispatch => ({
  handleClickChess: (index, layout, data, history, winnerSide) => handleClickChess(dispatch, index, layout, data, history, winnerSide),
  handleMoveChess: (isAbleReceive, index, history, currentChessIndex) => handleMoveChess(dispatch, isAbleReceive, index, history, currentChessIndex),
  replay: () => handleReplay(dispatch),
  goBack: () => handleGoBack(dispatch),
})


/**
 * 处理点击一个棋子
 * @param dispatch
 * @param currentChessIndex : 当前点击的棋子的索引
 * @param layout : 当前的棋子布局
 * @param chessData : 点击的棋子的数据
 * @param history
 * @param winnerSide : 胜出方
 */
function handleClickChess (dispatch, currentChessIndex, layout, chessData, history, winnerSide) {
  if (winnerSide) return // 已经有人胜出，则不能再继续移动棋子了
  
  let currentSide = history[history.length - 1].nextSide // 这一步可以下的 side
  if (chessData.side !== currentSide) return // 不是这一步可以下的颜色的棋子，不能点击
  
  // 1、改变点击棋子的样式
  dispatch(setCurrentChessIndex(currentChessIndex))
  // 2、找落子点
  let ableReceiveIndices = getAbleReceiveIndices(currentChessIndex, chessData, layout)
  dispatch(setAbleReceiveIndices(ableReceiveIndices))
}

// 处理点击一个落子点
function handleMoveChess (dispatch, isAbleReceive, clickSquareIndex, history, currentChessIndex) {
  if (!isAbleReceive) return // 点击的这个点不是落子点，则返回
  
  let newLayout = _.cloneDeep(history[history.length - 1].layout)
  let currentSide = history[history.length - 1].nextSide
  
  if (newLayout[clickSquareIndex[0]][clickSquareIndex[1]] &&
    newLayout[clickSquareIndex[0]][clickSquareIndex[1]].role === 'jiang') { // 如果吃掉了对方的 将军
    dispatch(setWinnerSide(currentSide))
  }
  newLayout[clickSquareIndex[0]][clickSquareIndex[1]] = newLayout[currentChessIndex[0]][currentChessIndex[1]]
  newLayout[currentChessIndex[0]][currentChessIndex[1]] = null
  
  // 更新布局
  dispatch(addHistory({
    nextSide: currentSide === 1 ? 0 : 1,
    layout: newLayout,
  }))
  
  // 清空落子点
  dispatch(setAbleReceiveIndices([]))
  
  // 判断有没有将对方的军
  // 1) 先找到对方将军的索引
  let compareSide = currentSide === 1 ? 0 : 1
  let compareSideGeneralIndex = getGeneralIndex(newLayout, compareSide)
  // 2) 找到 当前方 的所有棋子的 落子点
  let allAbleReceiveIndices = getAllAbleReceiveIndicesOfThisSide(currentSide, newLayout)
  // 3) 判断有没有将对方的军，如果有，播放 将军 的音频
  let generalIsDangerous = false // 假设没有将对方的军
  for (let i = 0; i < allAbleReceiveIndices.length; i++) {
    if (allAbleReceiveIndices[i][0] === compareSideGeneralIndex[0] &&
      allAbleReceiveIndices[i][1] === compareSideGeneralIndex[1]) {
      generalIsDangerous = true
      break
    }
  }
  if (generalIsDangerous) {
    let jiangJunAudio = document.getElementById('jiang-jun')
    jiangJunAudio.play()
  }
  
}

/**
 * 返回棋子布局为 layout 时，颜色为 searchSide 这一方的 将军 的索引
 * @param layout
 * @param searchSide
 * @returns {number[]|*[]}
 */
function getGeneralIndex (layout, searchSide) {
  for (let i = 0; i < layout.length; i++) {
    for (let j = 0; j < layout[i].length; j++) {
      if (layout[i][j] && layout[i][j].side === searchSide && layout[i][j].role === 'jiang') {
        return [i, j]
      }
    }
  }
  return []
}

function handleReplay (dispatch) {
  dispatch(setAbleReceiveIndices([]))
  dispatch(setCurrentChessIndex([null, null]))
  dispatch(clearHistory())
  dispatch(setWinnerSide(null))
}

function handleGoBack (dispatch) {
  dispatch(popHistory())
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)