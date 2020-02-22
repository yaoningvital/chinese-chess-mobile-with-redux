import * as types from '../actions/types'

function winnerSide (state = null, action) {
  switch (action.type) {
    case types.SET_WINNER_SIDE:
      return action.winnerSide;
    default:
      return state;
  }
}

export default winnerSide