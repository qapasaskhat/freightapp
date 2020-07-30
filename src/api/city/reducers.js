import {
    FETCH_BEGIN_CITY,
    FETCH_SUCCESS_CITY,
    FETCH_ERROR_CITY
} from './actions'

const initianState = {
    cityData: {},
    loading: false,
    error: null,
}

export default function reducerCity(state = initianState, action){
    switch(action.type){
        case FETCH_BEGIN_CITY:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_SUCCESS_CITY:
            return {
                ...state,
                loading: false,
                cityData: action.payload.data
            }
        case FETCH_ERROR_CITY:
            return {
                ...state,
                loading: false,
                cityData: {},
                error: action.payload.error
            }
        default:
            return state
    }
}
