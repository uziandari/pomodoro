export const INCREMENT_TIME = 'sessionTimer/INCREMENT_TIME';
export const DECREMENT_TIME = 'sessionTimer/DECREMENT_TIME';
export const RESET_TIME = 'sessionTimer/RESET_TIME';
export const START_TIMER = 'sessionTimer/START_TIMER';
export const STOP_TIMER = 'sessionTimer/STOP_TIMER';
export const SWITCH_TIMER = 'sessionTimer/SWITCH_TIMER';

const initialState = {
  sessionBaseTime: 25,
  breakBaseTime: 5,
  playing: false,
  currentTimer: "session",
  playTime: undefined,
  goalTime: undefined
};

export default (state = initialState, action) => {
  switch(action.type) {
    case INCREMENT_TIME:
      if (action.id === "sessionBaseTime" && state.currentTimer === "session") {
        return {
          ...state,
          [action.id]: action.value,
          goalTime: state.goalTime + 60000
        }
      }
      if (action.id === "breakBaseTime" && state.currentTimer === "break") {
        return {
          ...state,
          [action.id]: action.value,
          goalTime: state.goalTime + 60000
        }
      }
      return {
        ...state,
        [action.id]: action.value
      }
    case DECREMENT_TIME:
      if (action.id === "sessionBaseTime" && state.currentTimer === "session") {
        return {
          ...state,
          [action.id]: Math.max(action.value, 1),
          goalTime: state.goalTime - 60000
        }
      }
      if (action.id === "breakBaseTime" && state.currentTimer === "break") {
        return {
          ...state,
          [action.id]: Math.max(action.value, 1),
          goalTime: state.goalTime - 60000
        }
      }
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
        currentTimer: "session",
        playTime: undefined,
        stopTime: undefined,
        goalTime: undefined
      }
    case START_TIMER:
      return {
        ...state,
        playing: true,
        playTime: action.currentTime,
        goalTime: (state.stopTime && state.goalTime) 
                    ? action.currentTime + (state.goalTime - state.stopTime) 
                    : action.currentTime + (state.sessionBaseTime * 60000),
        stopTime: undefined
      }
    case STOP_TIMER:
      return {
        ...state,
        playing: false,
        stopTime: action.currentTime,
      }
    case SWITCH_TIMER:
      return {
        ...state,
        currentTimer: (state.currentTimer === "session") ? "break" : "session",
        goalTime: (state.stopTime && state.goalTime) 
                    ? action.currentTime + (state.goalTime - state.stopTime) 
                    : (state.currentTimer === "session") 
                        ? action.currentTime + (state.breakBaseTime * 60000)
                        : action.currentTime + (state.sessionBaseTime * 60000)
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

export const switchTimer = () => {
  return {
    type: SWITCH_TIMER,
    currentTime: new Date().getTime()
  }
}