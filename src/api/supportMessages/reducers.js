import {
  FETCH_BEGIN_SUPPORT_MESSAGES,
  FETCH_SUCCESS_SUPPORT_MESSAGES,
  FETCH_ERROR_SUPPORT_MESSAGES,
  POST_BEGIN_SUPPORT_MESSAGES,
  POST_SUCCESS_SUPPORT_MESSAGES,
  POST_ERROR_SUPPORT_MESSAGES,
} from './actions';

const initianState = {
  dataSupportMessages: {},
  loading: false,
  loadingPost: false,
  error: null,
  errorPost: null,
};

export default function reducerSupportMessages(state = initianState, action) {
  switch (action.type) {
    case FETCH_BEGIN_SUPPORT_MESSAGES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUCCESS_SUPPORT_MESSAGES:
      return {
        ...state,
        loading: false,
        dataSupportMessages: action.payload.data,
      };
    case FETCH_ERROR_SUPPORT_MESSAGES:
      return {
        ...state,
        loading: false,
        dataSupportMessages: {},
        error: action.payload.error,
      };
    case POST_BEGIN_SUPPORT_MESSAGES:
      return {
        ...state,
        loadingPost: true,
        errorPost: null,
      };
    case POST_SUCCESS_SUPPORT_MESSAGES:
      return {
        ...state,
        loadingPost: false,
      };
    case POST_ERROR_SUPPORT_MESSAGES:
      return {
        ...state,
        loadingPost: false,
        errorPost: action.payload.error,
      };
    default:
      return state;
  }
}
