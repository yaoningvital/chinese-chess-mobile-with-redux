import * as types from '../actions/types'
import { chessDefault } from '../utils'

const initialHistory = [{
  nextSide: 1,
  layout: chessDefault,
}]

function history (state = initialHistory, action) {
  switch (action.type) {
    case types.ADD_HISTORY:
      return [...state, action.history];
    default:
      return state;
  }
}

export default history