import {
  POST_BEGIN_REGISTER,
  POST_SUCCESS_REGISTER,
  POST_ERROR_REGISTER,
} from './actions';

const initialState = {
  user: {},
  loading: false,
  error: null,
};

export default function reducerRegister(state = initialState, action) {
  switch (action.type) {
    case POST_BEGIN_REGISTER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_SUCCESS_REGISTER:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
      };
    case POST_ERROR_REGISTER:
      return {
        ...state,
        user: {},
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
