const api = 'http://gruz.viker.kz/api/codes';

import axios from 'axios';

export const FETCH_BEGIN_CODES = 'FETCH_BEGIN_CODES';
export const FETCH_SUCCESS_CODES = 'FETCH_SUCCESS_CODES';
export const FETCH_ERROR_CODES = 'FETCH_ERROR_CODES';
export const POST_BEGIN_CODES = 'POST_BEGIN_CODES';
export const POST_SUCCESS_CODES = 'POST_SUCCESS_CODES';
export const POST_ERROR_CODES = 'POST_ERROR_CODES';

export const fetch_begin_codes = () => ({
  type: FETCH_BEGIN_CODES,
});
export const fetch_success_codes = data => ({
  type: FETCH_SUCCESS_CODES,
  payload: {data},
});
export const fetch_error_codes = error => ({
  type: FETCH_ERROR_CODES,
  payload: {error},
});

export const post_begin_codes = () => ({
  type: POST_BEGIN_CODES,
});
export const post_success_codes = data => ({
  type: POST_SUCCESS_CODES,
  //payload: {data}
});
export const post_error_codes = error => ({
  type: POST_ERROR_CODES,
  payload: {error},
});

export function fetchCodes() {
  return dispatch => {
    dispatch(fetch_begin_codes());
    const request = axios({
      method: 'GET',
      url: api,
      headers: [],
    });
    return request
      .then(function(response) {
        console.log('action fetchAnnouncements');
        console.log(response.data);
        dispatch(fetch_success_codes(response.data));
      })
      .catch(function(error) {
        console.log(error);
        dispatch(fetch_error_codes(error));
      });
  };
}

export function postCodes(data) {
  return dispatch => {
    dispatch(post_begin_codes());
    const request = axios({
      method: 'POST',
      url: api,
      headers: [],
      data: data,
    });
    return request
      .then(function(response) {
        console.log('action postAnnouncements');
        console.log(response.data);
        dispatch(post_success_codes(response.data));
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
        dispatch(post_error_codes(error));
      });
  };
}
