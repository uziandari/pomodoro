import React from 'react'
import { connect } from 'react-redux'

const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const CurrentTimer = props => (
  <div>
    <div>
      {
        (props.timer) ? millisToMinutesAndSeconds(props.timer): null
      }
    </div>
  </div>
)

export default CurrentTimer