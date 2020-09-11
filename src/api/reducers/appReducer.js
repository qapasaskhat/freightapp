
  const initialState = {
    statusNotification: true,
    muteNotification: false
  };
  
  export default function appReducer(state = initialState, action) {
    switch (action.type) {
      case 'CHANGE_STATUS_NOTIFICATION':
        return {
          ...state,
          statusNotification: !state.statusNotification
        };
        case 'CHANGE_MUTE_NOTIFICATION':
            return{
                ...state,
                muteNotification: !state.muteNotification
            }
      default:
        return state;
    }
  }
  