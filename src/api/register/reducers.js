import {
    FETCH_BEGIN_REGISTER,
    FETCH_SUCCESS_REGISTER,
    FETCH_ERROR_REGISTER
} from './actions'

const initialState = {
    data: {},
    loading: false,
    error: null
}

export default function reducerRegister(state = initialState, action){
    switch(action.type){
        case FETCH_BEGIN_REGISTER:
            return{
                ...state,
                loading: true,
                error: null
            }
        case FETCH_SUCCESS_REGISTER:
            return{
                ...state,
                loading: false,
                data: action.payload.data
            }
        case FETCH_ERROR_REGISTER:
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