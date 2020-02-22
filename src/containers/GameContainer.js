import React from 'react'
import Game from '../components/Game'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    history: state.history,
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)