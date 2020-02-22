import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer  from './reducers'
import GameContainer from './containers/GameContainer'
// import Game from './components/Game'
import './index.scss'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <GameContainer/>
  </Provider>,
  document.getElementById('root')
)

