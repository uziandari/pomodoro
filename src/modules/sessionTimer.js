export const INCREMENT_TIME = 'sessionTimer/INCREMENT_TIME';
export const DECREMENT_TIME = 'sessionTimer/DECREMENT_TIME';
export const RESET_TIME = 'sessionTimer/RESET_TIME';
export const START_TIMER = 'sessionTimer/START_TIMER';


const initialState = {
  sessionBaseTime: 25,
  breakBaseTime: 5,
  playing: false,
  sessionTime: null,
  breakTime: null
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
      }
    case START_TIMER:
      return {
        ...state,
        playing: !state.playing,
        sessionTime: action.currentTime + state.sessionBaseTime * 60000,
        breakTime: action.currentTime + (state.sessionBaseTime + state.breakBaseTime) * 60000 
      }
    default:
      return state;
  }
};

export const addTime = (id, value) => {
  console.log(value)
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
    currentTime: new Date().getTime()
  })
}

