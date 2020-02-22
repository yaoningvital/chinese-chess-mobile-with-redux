import * as types from './types'

export function setCurrentChessIndex (index) {
  return {
    type: types.SET_CURRENT_CHESS_INDEX,
    index
  }
}

export function setAbleReceiveIndices (ableReceiveIndices) {
  return {
    type: types.SET_ABLE_RECEIVE_INDICES,
    ableReceiveIndices
  }
}

export function setWinnerSide (winnerSide) {
  return {
    type: types.SET_WINNER_SIDE,
    winnerSide
  }
}

export function addHistory (historyItem) {
  return {
    type: types.ADD_HISTORY,
    historyItem
  }
}

export function clearHistory () {
  return {
    type: types.CLEAR_HISTORY
  }
}

export function popHistory () {
  return {
    type: types.POP_HISTORY
  }
}