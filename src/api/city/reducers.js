import {
  FETCH_BEGIN_CITY,
  FETCH_SUCCESS_CITY,
  FETCH_ERROR_CITY,
  POST_BEGIN_CITY,
  POST_SUCCESS_CITY,
  POST_ERROR_CITY,
} from './actions';

const initianState = {
  cityData: {},
  loading: false,
  error: null,
  loadingPost: false,
  errorPost: null,
};

export default function reducerCity(state = initianState, action) {
  switch (action.type) {
    case FETCH_BEGIN_CITY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUCCESS_CITY:
      return {
        ...state,
        loading: false,
        cityData: action.payload.data,
      };
    case FETCH_ERROR_CITY:
      return {
        ...state,
        loading: false,
        cityData: {},
        error: action.payload.error,
      };
    case POST_BEGIN_CITY:
      return {
        ...state,
        loadingPost: true,
        errorPost: null,
      };
    case POST_SUCCESS_CITY:
      return {
        ...state,
        loadingPost: false,
      };
    case POST_ERROR_CITY:
      return {
        ...state,
        loadingPost: false,
        errorPost: action.payload.error,
      };
    default:
      return state;
  }
}
