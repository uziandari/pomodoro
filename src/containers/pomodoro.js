import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  addTime,
  subtractTime,
  resetTimers,
  playTimer,
  stopTimer
} from '../modules/sessionTimer'

import Timer from '../components/timer'
import CurrentTimer from '../components/currentTimer'

class Pomodoro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null
    }
    this.startCountDown = this.startCountDown.bind(this)
    this.endCountDown = this.endCountDown.bind(this)
    this.tick = this.tick.bind(this)
  }

  startCountDown() {
    this.props.playTimer()

    this.interval = setInterval(() => this.tick(), 1000)
  }

  endCountDown() {
    this.interval = clearInterval(this.interval)
    this.props.stopTimer()
  }

  tick() {
    this.setState({
      timer: Math.min(this.props.sessionGoalTime, this.props.breakGoalTime) - new Date().getTime()
    })
  }


  render() {
    return (
      <div className="pomo-container">
      
        <div className="pomo-timer" id="session-timer">
          <button onClick={() => this.props.addTime("sessionBaseTime", this.props.sessionBaseTime + 1)}>add</button>
          <Timer baseTime={this.props.sessionBaseTime} />
          <button onClick={() => this.props.subtractTime("sessionBaseTime", this.props.sessionBaseTime - 1)}>subtract</button>
        </div>
        <div className="pomo-timer" id="break-timer">
          <button onClick={() => this.props.addTime("breakBaseTime", this.props.breakBaseTime + 1)}>add</button>
          <Timer baseTime={this.props.breakBaseTime} />
          <button onClick={() => this.props.subtractTime("breakBaseTime", this.props.breakBaseTime - 1)}>subtract</button>
        </div>
        <div className="controls">
            {
              (!this.props.playPauseControl) 
                ? <button onClick={() => this.startCountDown()}>Start</button>
                : <button onClick={() => this.endCountDown()}>Stop</button>
            }
          
          <button onClick={() => this.props.resetTimers()}>Reset</button>
        </div>
        <div className="current-timer">
            <CurrentTimer timer={this.state.timer} />
        </div>
    
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTime: (id, value) => { dispatch(addTime(id, value)) },
    subtractTime: (id, value) => { dispatch(subtractTime(id, value)) },
    resetTimers: () => { dispatch(resetTimers()) },
    playTimer: () => { dispatch(playTimer()) },
    stopTimer: () => { dispatch(stopTimer()) }
  }
}

const mapStateToProps = (state) => ({
  sessionBaseTime: state.sessionTimer.sessionBaseTime,
  breakBaseTime: state.sessionTimer.breakBaseTime,
  playPauseControl: state.sessionTimer.playing,
  sessionGoalTime: state.sessionTimer.sessionGoalTime,
  breakGoalTime: state.sessionTimer.breakGoalTime,
})

Pomodoro.propTypes = {
  addTime: PropTypes.func.isRequired,
  subtractTime: PropTypes.func.isRequired
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pomodoro);