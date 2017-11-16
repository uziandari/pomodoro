export const INCREMENT_TIME = 'sessionTimer/INCREMENT_TIME';
export const DECREMENT_TIME = 'sessionTimer/DECREMENT_TIME';
export const RESET_TIME = 'sessionTimer/RESET_TIME';
export const START_TIMER = 'sessionTimer/START_TIMER';
export const STOP_TIMER = 'sessionTimer/STOP_TIMER';


const initialState = {
  sessionBaseTime: .1,
  breakBaseTime: 5,
  playing: false,
  playTime: undefined,
  sessionGoalTime: undefined,
  breakGoalTime: undefined,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case INCREMENT_TIME:
      return {
        ...state,
        [action.id]: action.value
      }
    case DECREMENT_TIME:
      return {
        ...state,
        [action.id]: Math.max(action.value, 1)
      }
    case RESET_TIME:
      return {
        ...state,
        sessionBaseTime: 25,
        breakBaseTime: 5,
        playing: false,
        playTime: undefined,
        stopTime: undefined,
        sessionGoalTime: undefined,
        breakGoalTime: undefined
      }
    case START_TIMER:
      return {
        ...state,
        playing: true,
        playTime: action.currentTime,
        sessionGoalTime: (state.stopTime) 
                    ? action.currentTime + (state.sessionGoalTime - state.stopTime) 
                    : action.currentTime + (state.sessionBaseTime * 60000),
        breakGoalTime: (state.stopTime) 
                    ? action.currentTime + (state.breakGoalTime - state.stopTime) 
                    : action.currentTime + ((state.sessionBaseTime + state.breakBaseTime) * 60000),
        stopTime: undefined
      }
    case STOP_TIMER:
      return {
        ...state,
        playing: false,
        stopTime: action.currentTime,
      }
    default:
      return state;
  }
};

export const addTime = (id, value) => {
  return {
    type: INCREMENT_TIME,
    id,
    value
  }
}

export const subtractTime = (id, value) => {
  return {
    type: DECREMENT_TIME,
    id,
    value
  }
}

export const resetTimers = () => {
  return {
    type: RESET_TIME
  }
}

export const playTimer = () => {
  return({
    type: START_TIMER,
    currentTime: new Date().getTime(),
  })
}

export const stopTimer = () => {
  return {
    type: STOP_TIMER,
    currentTime: new Date().getTime(),
  }
}
