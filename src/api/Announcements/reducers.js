import {
  FETCH_BEGIN,
  FETCH_SUCCESS,
  FETCH_ERROR,
  POST_BEGIN,
  POST_SUCCESS,
  POST_ERROR,
  PUT_BEGIN,
  PUT_SUCCESS,
  PUT_ERROR,
  DELETE_BEGIN,
  DELETE_SUCCESS,
  DELETE_ERROR,
} from './actions';

const initianState = {
  dataAnnouncements: [],
  loading: false,
  loadingPost: false,
  loadingPut: false,
  loadingDelete: false,
  error: null,
  errorPost: null,
  errorDelete: null,
  errorPut: null,
};

export default function reducerAnnouncements(state = initianState, action) {
  switch (action.type) {
    case FETCH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        dataAnnouncements: action.payload.data,
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        dataAnnouncements: [],
        error: action.payload.error,
      };
    case POST_BEGIN:
      return {
        ...state,
        loadingPost: true,
        errorPost: null,
      };
    case POST_SUCCESS:
      return {
        ...state,
        loadingPost: false,
      };
    case POST_ERROR:
      return {
        ...state,
        loadingPost: false,
        errorPost: action.payload.error,
      };
    case PUT_BEGIN:
      return {
        ...state,
        loadingPut: true,
        errorPut: null,
      };
    case PUT_SUCCESS:
      return {
        ...state,
        loadingPut: false,
      };
    case PUT_ERROR:
      return {
        ...state,
        loadingPut: false,
        errorPut: action.payload.error,
      };
    case DELETE_BEGIN:
      return {
        ...state,
        loadingDelete: true,
        errorDelete: null,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        loadingDelete: false,
      };
    case DELETE_ERROR:
      return {
        ...state,
        loadingDelete: false,
        errorDelete: action.payload.error,
      };
    default:
      return state;
  }
}
