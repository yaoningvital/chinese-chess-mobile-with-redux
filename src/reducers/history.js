import * as types from '../actions/types'
import { chessDefault } from '../utils'

const initialHistory = [{
  nextSide: 1,
  layout: chessDefault,
}]

function history (state = initialHistory, action) {
  switch (action.type) {
    case types.ADD_HISTORY:
      return [...state, action.historyItem];
    case types.POP_HISTORY:
      return state.slice(0, state.length - 1);
    case types.CLEAR_HISTORY:
      return state.slice(0, 1);
    default:
      return state;
  }
}

export default history