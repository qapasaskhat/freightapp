import { cos } from 'react-native-reanimated';
import {
  FETCH_BEGIN,
  FETCH_SUCCESS,
  FETCH_ERROR,
  FETCH_BEGIN_ORDERS_ID,
  FETCH_SUCCESS_ORDERS_ID,
  FETCH_ERROR_ORDERS_ID,
  POST_BEGIN,
  POST_SUCCESS,
  POST_ERROR,
  PUT_BEGIN,
  PUT_SUCCESS,
  PUT_ERROR,
  DELETE_BEGIN,
  DELETE_SUCCESS,
  DELETE_ERROR,
  FETCH_SUCCESS_ADD,
  FETCH_SUCCESS_ADD_ORDERS_ID
} from './actions';

const initianState = {
  dataAnnouncements: [],
  dataAnnouncementsUser: [],
  loading: false,
  loadingPost: false,
  loadingPut: false,
  loadingDelete: false,
  loadingUserOrders: false,
  error: null,
  errorPost: null,
  errorDelete: null,
  errorPut: null,
  errorUserOrders: null,
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
      console.log('action',action)
      return {
        ...state,
        loading: false,
        dataAnnouncements: action.payload.data // action.payload.page === 1 ? action.payload.data : state.dataAnnouncements.concat(action.payload.data)  //[...state.dataAnnouncements, action.payload.data],
      };
    case FETCH_SUCCESS_ADD:
      return{
        ...state,
        dataAnnouncements: state.dataAnnouncements.concat(action.payload.data) 
      }
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        dataAnnouncements: [],
        error: action.payload.error,
      };
    case FETCH_BEGIN_ORDERS_ID:
      return {
        ...state,
        loadingUserOrders: true,
        errorUserOrders: null,
      };
    case FETCH_SUCCESS_ORDERS_ID:
      return {
        ...state,
        loadingUserOrders: false,
        dataAnnouncementsUser: action.payload.data,
      };
    case FETCH_SUCCESS_ADD_ORDERS_ID:
      return {
        ...state,
        dataAnnouncementsUser: state.dataAnnouncementsUser.data.concat(action.payload.data.data)
      }
    case FETCH_ERROR_ORDERS_ID:
      return {
        ...state,
        loadingUserOrders: false,
        dataAnnouncementsUser: [],
        errorUserOrders: action.payload.error,
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
        // dataAnnouncementsUser: [
        //   state.dataAnnouncementsUser,
        //   action.payload.data,
        // ],
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
    case 'LOG_OUT':
      return {
        dataAnnouncements: [],
        dataAnnouncementsUser: [],
        loading: false,
        loadingPost: false,
        loadingPut: false,
        loadingDelete: false,
        loadingUserOrders: false,
        error: null,
        errorPost: null,
        errorDelete: null,
        errorPut: null,
        errorUserOrders: null,
      }
    default:
      return state;
  }
}
