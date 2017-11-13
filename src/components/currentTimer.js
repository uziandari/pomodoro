import React from 'react'
import { connect } from 'react-redux'

const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const CurrentTimer = props => (
  <div>
    Session: {millisToMinutesAndSeconds(props.sessionCountdown)}
    Break: {millisToMinutesAndSeconds(props.breakCountdown)}
  </div>
)

const mapStateToProps = (state) => ({
  sessionCountdown: state.sessionTimer.sessionTimeLeft,
  breakCountdown: state.sessionTimer.breakTimeLeft
})

export default connect(
  mapStateToProps
)(CurrentTimer);