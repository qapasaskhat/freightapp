import {
  FETCH_BEGIN_USERS,
  FETCH_SUCCESS_USERS,
  FETCH_ERROR_USERS,
  POST_BEGIN_USERS,
  POST_SUCCESS_USERS,
  POST_ERROR_USERS,
  PUT_BEGIN_USERS,
  PUT_SUCCESS_USERS,
  PUT_ERROR_USERS,
} from './actions';

const initianState = {
  userData: {},
  loading: false,
  error: null,
  loadingPost: false,
  errorPost: null,
  loadingPut: false,
  errorPut: null,
};

export default function reducerUsers(state = initianState, action) {
  switch (action.type) {
    case FETCH_BEGIN_USERS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUCCESS_USERS:
      return {
        ...state,
        loading: false,
        userData: action.payload.data,
      };
    case FETCH_ERROR_USERS:
      return {
        ...state,
        loading: false,
        userData: {},
        error: action.payload.error,
      };
    case POST_BEGIN_USERS:
      return {
        ...state,
        loadingPost: true,
        errorPost: null,
      };
    case POST_SUCCESS_USERS:
      return {
        ...state,
        loadingPost: false,
      };
    case POST_ERROR_USERS:
      return {
        ...state,
        loadingPost: false,
        errorPost: action.payload.error,
      };
    case PUT_BEGIN_USERS:
      return {
        ...state,
        loadingPut: true,
        errorPut: null,
      };
    case PUT_SUCCESS_USERS:
      return {
        ...state,
        loadingPut: false,
      };
    case PUT_ERROR_USERS:
      return {
        ...state,
        loadingPut: false,
        errorPut: action.payload.error,
      };
    case 'LOG_OUT':
      return{
        ...state,
        userData: {},
        loading: false,
        error: null,
        loadingPost: false,
        errorPost: null,
        loadingPut: false,
        errorPut: null,
      }
    default:
      return state;
  }
}
