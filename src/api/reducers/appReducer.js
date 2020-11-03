
  const initialState = {
    statusNotification: true,
    muteNotification: true,
    langId:0,
    city_id: 0,
    city_name: 'almaty'
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
        case 'GET_CITY_NAME':
          return{
            ...state,
            city_id: action.payload.id,
            city_name: action.payload.name
          }
      default:
        return state;
    }
  }
  