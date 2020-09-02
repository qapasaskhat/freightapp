const api = 'http://gruz.sport-market.kz/api/chats';

import axios from 'axios';

export const FETCH_BEGIN_CHATS = 'FETCH_BEGIN_CHATS';
export const FETCH_SUCCESS_CHATS = 'FETCH_SUCCESS_CHATS';
export const FETCH_ERROR_CHATS = 'FETCH_ERROR_CHATS';
export const POST_BEGIN_CHATS = 'POST_BEGIN_CHATS';
export const POST_SUCCESS_CHATS = 'POST_SUCCESS_CHATS';
export const POST_ERROR_CHATS = 'POST_ERROR_CHATS';

export const fetch_begin_chats = () => ({
  type: FETCH_BEGIN_CHATS,
});
export const fetch_success_chats = data => ({
  type: FETCH_SUCCESS_CHATS,
  payload: {data},
});
export const fetch_error_chats = error => ({
  type: FETCH_ERROR_CHATS,
  payload: {error},
});

export const post_begin_chats = () => ({
  type: POST_BEGIN_CHATS,
});
export const post_success_chats = data => ({
  type: POST_SUCCESS_CHATS,
  //payload: {data}
});
export const post_error_chats = error => ({
  type: POST_ERROR_CHATS,
  payload: {error},
});

export function fetchChats() {
  return dispatch => {
    dispatch(fetch_begin_chats());
    const request = axios({
      method: 'GET',
      url: api,
      headers: [],
    });
    return request
      .then(function(response) {
        console.log('action fetchAnnouncements');
        console.log(response.data);
        dispatch(fetch_success_chats(response.data));
      })
      .catch(function(error) {
        console.log(error);
        dispatch(fetch_error_chats(error));
      });
  };
}

export function postChats(data) {
  return dispatch => {
    dispatch(post_begin_chats());
    const request = axios({
      method: 'POST',
      url: api,
      headers: [],
      data: data,
    });
    return request
      .then(function(response) {
        console.log('action postChats');
        console.log(response.data);
        dispatch(post_success_chats(response.data));
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
        dispatch(post_error_chats(error));
      });
  };
}
