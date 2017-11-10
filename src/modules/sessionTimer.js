export const INCREMENT_TIME = 'sessionTimer/INCREMENT_TIME';
export const DECREMENT_TIME = 'sessionTimer/DECREMENT_TIME';
export const RESET_TIME = 'sessionTimer/RESET_TIME';
export const PLAY_PAUSE = 'sessionTimer/PLAY_PAUSE';


const initialState = {
  timers: [
    {
      id: "session",
      baseTime: 25,
      timeLeft: null,
    },
    {
      id: "break",
      baseTime: 5,
      timeLeft: null,
    }
  ],
  play: false,
  currentTimer: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case INCREMENT_TIME:
      return {
        ...state,
        timers: state.timers.map((timer) => {
          if (timer.id === action.id) {
            return {
              ...timer, 
              baseTime: timer.baseTime + 1,
              timeLeft: (timer.timeLeft) ? timer.timeLeft + 1 : null
            }
          }
          return {...timer}
        })
      }
    case DECREMENT_TIME:
      return {
        ...state,
        timers: state.timers.map((timer) => {
          if (timer.id === action.id) {
            return {
              ...timer, 
              baseTime: Math.max(timer.baseTime - 1, 1),
              timeLeft: (timer.timeLeft) ? Math.max(timer.timeLeft - 1, 1) : null
            }
          }
          return {...timer}
        })
      }
    case RESET_TIME:
      return {
        ...state,
        timers: [
          {
            id: "session",
            baseTime: 25,
            timeLeft: null,
          },
          {
            id: "break",
            baseTime: 5,
            timeLeft: null,
          }
        ],
        play: false,
        currentTimer: null
      }
    case PLAY_PAUSE:
      return {
        ...state,
        play: !state.play,
        currentTimer: action.id,
        timers: state.timers.map((timer) => {
          if (timer.id === action.id) {
            return {...timer, timeLeft: (timer.timeLeft) ? Math.min(timer.timeLeft, timer.baseTime) : timer.baseTime}
          }
          return {...timer}
        })
      }
    default:
      return state;
  }
};

export const addTime = (id) => {
  return {
    type: INCREMENT_TIME,
    id
  }
}

export const subtractTime = (id) => {
  return {
    type: DECREMENT_TIME,
    id
  }
}

export const resetTimers = () => {
  return {
    type: RESET_TIME
  }
}

export const playTimer = (id) => {
  return {
    type: PLAY_PAUSE,
    id
  }
}

