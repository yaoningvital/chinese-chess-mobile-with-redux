import * as types from '../actions/types'

const initialCurrentChessIndex = [null, null]

function currentChessIndex (state = initialCurrentChessIndex, action) {
  switch (action.type) {
    case types.SET_CURRENT_CHESS_INDEX:
      return action.index;
    default:
      return state;
  }
}

export default currentChessIndex