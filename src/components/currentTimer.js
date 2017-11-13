import React from 'react'
import { connect } from 'react-redux'


const countdown = () => {
  let timer = null
  timer = setInterval(() => {
    //dispatch tick
    console.log("hey")
  }, 1000)
}

const CurrentTimer = props => (
  <div>
    {props.currentCountdown}
    {props.playing && countdown()}
  </div>
)

const mapStateToProps = (state) => ({
  currentCountdown: state.sessionTimer.currentTimer,
  playing: state.sessionTimer.play,
  currentTimer: state.sessionTimer.timers.map((timer) => {
    return timer.id === state.sessionTimer.currentTimer
  })
})

export default connect(
  mapStateToProps
)(CurrentTimer);