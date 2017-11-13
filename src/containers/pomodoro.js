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
import CurrentTimer from '../components/currentTimer'


const Pomodoro = props => (
  <div className="pomo-container">

    <div className="pomo-timer" id="session-timer">
      <button onClick={() => props.addTime("sessionBaseTime", props.sessionBaseTime + 1)}>add</button>
      <Timer baseTime={props.sessionBaseTime} />
      <button onClick={() => props.subtractTime("sessionBaseTime", props.sessionBaseTime + 1)}>subtract</button>
      {/*remove time*/}
    </div>
    <div className="pomo-timer" id="break-timer">
      <button onClick={() => props.addTime("breakBaseTime", props.breakBaseTime + 1)}>add</button>
      <Timer baseTime={props.breakBaseTime} />
      <button onClick={() => props.subtractTime("breakBaseTime", props.breakBaseTime - 1)}>subtract</button>
    </div>
    <div className="controls">
      <button onClick={() => props.playTimer(props.currentTimer)}>
        {
          (props.playControl) ? <span>Pause</span> : <span>Play</span>
        }
      </button>
      <button onClick={() => props.resetTimers()}>Reset</button>
    </div>
    <div className="current-timer">
        <CurrentTimer currentTimer={props.currentTimer}/>
    </div>

  </div>
)

const mapDispatchToProps = dispatch => {
  return {
    addTime: (id, value) => { dispatch(addTime(id, value)) },
    subtractTime: (id, value) => { dispatch(subtractTime(id, value)) },
    resetTimers: () => { dispatch(resetTimers()) },
    playTimer: () => { dispatch(playTimer()) }
  }
}

const mapStateToProps = (state) => ({
  sessionBaseTime: state.sessionTimer.sessionBaseTime,
  breakBaseTime: state.sessionTimer.breakBaseTime,
  playControl: state.sessionTimer.playing,
  currentTimer: state.sessionTimer.currentTimer
})

Pomodoro.propTypes = {
  addTime: PropTypes.func.isRequired,
  subtractTime: PropTypes.func.isRequired
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pomodoro);