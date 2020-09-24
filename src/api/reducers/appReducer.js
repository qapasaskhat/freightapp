
  const initialState = {
    statusNotification: true,
    muteNotification: true,
    langId:1
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
        case 'CHANGE_LANG':
          return{
            ...state,
            langId: action.payload
          }
      default:
        return state;
    }
  }
  