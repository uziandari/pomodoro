export const INCREMENT_TIME = 'sessionTimer/INCREMENT_TIME';
export const DECREMENT_TIME = 'sessionTimer/DECREMENT_TIME';
export const RESET_TIME = 'sessionTimer/RESET_TIME';
export const START_TIMER = 'sessionTimer/START_TIMER';
export const PAUSE_TIMER = 'sessionTimer/PAUSE_TIMER';
export const TICK = 'sessionTimer/TICK';


const initialState = {
  sessionBaseTime: 25,
  breakBaseTime: 5,
  playing: false,
  sessionTime: null,
  breakTime: null,
  interval: null,
  sessionTimeLeft: null,
  breakTimeLeft: null
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
        sessionTime: null,
        breakTime: null,
        interval: null,
        sessionTimeLeft: null,
        breakTimeLeft: null
      }
    case START_TIMER:
      if (state.sessionTime === null && state.breakTime === null) {
        return {
          ...state,
          playing: true,
          sessionTime: action.time + state.sessionBaseTime * 60000,
          breakTime: action.time + (state.sessionBaseTime + state.breakBaseTime) * 60000,
          interval: action.interval 
        }
      }
      return {
        ...state,
        playing: true,
        sessionTime: state.sessionTimeLeft + action.time,
        breakTime: state.breakTimeLeft + action.time,
        interval: action.interval 
      }
      
    case PAUSE_TIMER:
      return {
        ...state,
        playing: false,
        sessionTime: state.sessionTime - action.time,
        breakTime: state.breakTime - action.time,
        interval: null 
      }
    case TICK:
      return {
        ...state,
        sessionTimeLeft: state.sessionTime - action.time,
        breakTimeLeft: state.breakTime - action.time
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

export const resetTimers = (interval) => {
  clearInterval(interval)
  return {
    type: RESET_TIME
  }
}

export const playTimer = (dispatch) => {
  const interval = setInterval(() => {
    dispatch({
      type: TICK,
      time: new Date().getTime()
    })
  }, 1000)
  
  return({
    type: START_TIMER,
    time: new Date().getTime(),
    interval
  })
}

export const pauseTimer = (interval) => {
  clearInterval(interval)
  return {
    type: PAUSE_TIMER,
    time: new Date().getTime(),
  }
}

