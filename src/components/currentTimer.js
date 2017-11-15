import React from 'react'
import { connect } from 'react-redux'

const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const timeLeft = (goalTime) => millisToMinutesAndSeconds(goalTime - new Date().getTime())

const CurrentTimer = props => (
  <div>
    <div>
      {
        (props.sessionGoalTime) 
          ? millisToMinutesAndSeconds(props.sessionGoalTime - new Date().getTime())
          : millisToMinutesAndSeconds(props.sessionBaseTime * 60000)
      }
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  playTime: state.sessionTimer.playTime,
  sessionBaseTime: state.sessionTimer.sessionBaseTime,
  sessionGoalTime: state.sessionTimer.sessionGoalTime,
  breakGoalTime: state.sessionTimer.breakGoalTime,
  playing: state.sessionTimer.playing  
})

export default connect(
  mapStateToProps
)(CurrentTimer);