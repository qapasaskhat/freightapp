import {
  FETCH_BEGIN_LOGIN,
  FETCH_SUCCESS_LOGIN,
  FETCH_ERROR_LOGIN,
} from './actions';

const initialState = {
  token: '',
  loading: false,
  error: null,
  role: null
};

export default function reducerLogin(state = initialState, action) {
  switch (action.type) {
    case FETCH_BEGIN_LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUCCESS_LOGIN:
      return {
        ...state,
        loading: false,
        token: action.payload.data,
        role: action.payload.role
      };
    case FETCH_ERROR_LOGIN:
      return {
        ...state,
        token: '',
        loading: false,
        error: action.payload.error,
      };
    case 'LOG_OUT':
      return{
        ...state,
        token: '',
        loading: false,
        error: null,
        role: null
      }
    default:
      return state;
  }
}
