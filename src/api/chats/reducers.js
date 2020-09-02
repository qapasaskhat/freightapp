import {
  FETCH_BEGIN_CHATS,
  FETCH_SUCCESS_CHATS,
  FETCH_ERROR_CHATS,
  POST_BEGIN_CHATS,
  POST_SUCCESS_CHATS,
  POST_ERROR_CHATS,
} from './actions';

const initianState = {
  dataChats: {},
  loading: false,
  loadingPost: false,
  error: null,
  errorPost: null,
};

export default function reducerChats(state = initianState, action) {
  switch (action.type) {
    case FETCH_BEGIN_CHATS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUCCESS_CHATS:
      return {
        ...state,
        loading: false,
        dataChats: action.payload.data,
      };
    case FETCH_ERROR_CHATS:
      return {
        ...state,
        loading: false,
        dataChats: {},
        error: action.payload.error,
      };
    case POST_BEGIN_CHATS:
      return {
        ...state,
        loadingPost: true,
        errorPost: null,
      };
    case POST_SUCCESS_CHATS:
      return {
        ...state,
        loadingPost: false,
      };
    case POST_ERROR_CHATS:
      return {
        ...state,
        loadingPost: false,
        errorPost: action.payload.error,
      };
    default:
      return state;
  }
}
