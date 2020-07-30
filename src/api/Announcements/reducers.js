import {
    FETCH_BEGIN,
    FETCH_SUCCESS,
    FETCH_ERROR
} from './actions'

const initianState = {
    data: {},
    loading: false,
    error: null,
}

export default function reducerAnnouncements(state = initianState, action){
    switch(action.type){
        case FETCH_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data
            }
        case FETCH_ERROR:
            return {
                ...state,
                loading: false,
                data: {},
                error: action.payload.error
            }
        default:
            return state
    }
}
