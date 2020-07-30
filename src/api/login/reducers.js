import {
    FETCH_BEGIN_LOGIN,
    FETCH_SUCCESS_LOGIN,
    FETCH_ERROR_LOGIN
} from './actions'

const initialState = {
    data: {},
    loading: false,
    error: null
}

export default function reducerLogin(state = initialState, action){
    switch(action.type){
        case FETCH_BEGIN_LOGIN:
            return{
                ...state,
                loading: true,
                error: null
            }
        case FETCH_SUCCESS_LOGIN:
            return{
                ...state,
                loading: false,
                data: action.payload.data
            }
        case FETCH_ERROR_LOGIN:
            return{
                ...state,
                data: {},
                loading: false,
                error: action.payload.error
            }
        default:
            return state
    }
}