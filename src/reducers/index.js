import { combineReducers } from "redux";
import history from './history'
import currentChessIndex from './currentChessIndex'
import ableReceiveIndices from './ableReceiveIndices'
import winnerSide from './winnerSide'

export default combineReducers({
  history,
  currentChessIndex,
  ableReceiveIndices,
  winnerSide,
})