import {
  FETCH_BEGIN_ARCHIVE,
  FETCH_SUCCESS_ARCHIVE,
  FETCH_ERROR_ARCHIVE,
} from './actions';

const initianState = {
  dataArchive: [],
  loadingArchive: false,
  errorArchive: null,
};

export default function reducerAnnouncements(state = initianState, action) {
  switch (action.type) {
    case FETCH_BEGIN_ARCHIVE:
      return {
        ...state,
        loadingArchive: true,
        errorArchive: null,
      };
    case FETCH_SUCCESS_ARCHIVE:
      return {
        ...state,
        loadingArchive: false,
        dataArchive: action.payload.data,
      };
    case FETCH_ERROR_ARCHIVE:
      return {
        ...state,
        loadingArchive: false,
        dataArchive: [],
        errorArchive: action.payload.error,
      };
    default:
      return state;
  }
}
