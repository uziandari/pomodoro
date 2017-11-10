import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  addTime,
  subtractTime,
  resetTimers,
  playTimer
} from '../modules/sessionTimer'

import Timer from '../components/timer'


const Pomodoro = props => (
  <div className="pomo-container">

    <div className="pomo-timer" id="session-timer">
      <button onClick={() => props.addTime("session")}>add</button>
      <Timer baseTime={(props.sessionTimeLeft) ? props.sessionTimeLeft : props.sessionBaseTime} />
      <button onClick={() => props.subtractTime("session")}>subtract</button>
      {/*remove time*/}
    </div>
    <div className="pomo-timer" id="break-timer">
      <button onClick={() => props.addTime("break")}>add</button>
      <Timer baseTime={(props.breakTimeLeft) ? props.breakTimeLeft : props.breakBaseTime} />
      <button onClick={() => props.subtractTime("break")}>subtract</button>
    </div>
    <div className="controls">
      <button onClick={() => props.playTimer("session")}>
        {
          (props.playControl) ? <span>Pause</span> : <span>Play</span>
        }
      </button>
      <button onClick={() => props.resetTimers()}>Reset</button>
    </div>

  </div>
)

const mapDispatchToProps = dispatch => {
  return {
    addTime: (id) => { dispatch(addTime(id)) },
    subtractTime: (id) => { dispatch(subtractTime(id)) },
    resetTimers: (id) => { dispatch(resetTimers()) },
    playTimer: (id) => { dispatch(playTimer(id)) }
  }
}

const mapStateToProps = (state) => ({
  sessionBaseTime: state.sessionTimer.timers[0].baseTime,
  sessionTimeLeft: state.sessionTimer.timers[0].timeLeft,
  breakBaseTime: state.sessionTimer.timers[1].baseTime,
  breakTimeLeft: state.sessionTimer.timers[1].timeLeft,  
  playControl: state.sessionTimer.play,
  stopControl: state.sessionTimer.stop
})

Pomodoro.propTypes = {
  addTime: PropTypes.func.isRequired,
  subtractTime: PropTypes.func.isRequired
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pomodoro)