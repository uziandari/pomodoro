import React from 'react'
import { connect } from 'react-redux'

const CurrentTimer = props => (
  <div>
    {props.currentCountdown}
  </div>
)

const mapStateToProps = (state) => ({
  currentCountdown: state.sessionTimer.currentTimer,
})

export default connect(
  mapStateToProps
)(CurrentTimer);