import * as types from '../actions/types'

function ableReceiveIndices (state = [], action) {
  switch (action.type) {
    case types.SET_ABLE_RECEIVE_INDICES:
      return action.ableReceiveIndices;
    default:
      return state;
  }
}

export default ableReceiveIndices