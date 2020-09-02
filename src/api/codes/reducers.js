import {
  FETCH_BEGIN_CODES,
  FETCH_SUCCESS_CODES,
  FETCH_ERROR_CODES,
  POST_BEGIN_CODES,
  POST_SUCCESS_CODES,
  POST_ERROR_CODES,
} from './actions';

const initianState = {
  dataCodes: {},
  loading: false,
  loadingPost: false,
  error: null,
  errorPost: null,
};

export default function reducerCodes(state = initianState, action) {
  switch (action.type) {
    case FETCH_BEGIN_CODES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUCCESS_CODES:
      return {
        ...state,
        loading: false,
        dataCodes: action.payload.data,
      };
    case FETCH_ERROR_CODES:
      return {
        ...state,
        loading: false,
        dataCodes: {},
        error: action.payload.error,
      };
    case POST_BEGIN_CODES:
      return {
        ...state,
        loadingPost: true,
        errorPost: null,
      };
    case POST_SUCCESS_CODES:
      return {
        ...state,
        loadingPost: false,
      };
    case POST_ERROR_CODES:
      return {
        ...state,
        loadingPost: false,
        errorPost: action.payload.error,
      };
    default:
      return state;
  }
}
