const api = 'http://gruz.sport-market.kz/api/announcements';

import axios from 'axios';

export const FETCH_BEGIN = 'FETCH_BEGIN';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const POST_BEGIN = 'POST_BEGIN';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_ERROR = 'POST_ERROR';
export const PUT_BEGIN = 'PUT_BEGIN';
export const PUT_SUCCESS = 'PUT_SUCCESS';
export const PUT_ERROR = 'PUT_ERROR';
export const DELETE_BEGIN = 'DELETE_BEGIN';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_ERROR = 'DELETE_ERROR';

export const fetch_begin = () => ({
  type: FETCH_BEGIN,
});
export const fetch_success = data => ({
  type: FETCH_SUCCESS,
  payload: {data},
});
export const fetch_error = error => ({
  type: FETCH_ERROR,
  payload: {error},
});

export const post_begin = () => ({
  type: POST_BEGIN,
});
export const post_success = data => ({
  type: POST_SUCCESS,
  //payload: {data}
});
export const post_error = error => ({
  type: POST_ERROR,
  payload: {error},
});

export const put_begin = () => ({
  type: PUT_BEGIN,
});
export const put_success = data => ({
  type: PUT_SUCCESS,
  //payload: {data}
});
export const put_error = error => ({
  type: PUT_ERROR,
  payload: {error},
});

export const delete_begin = () => ({
  type: DELETE_BEGIN,
});
export const delete_success = data => ({
  type: DELETE_SUCCESS,
  //payload: {data}
});
export const delete_error = error => ({
  type: DELETE_ERROR,
  payload: {error},
});

export function fetchAnnouncements() {
  return dispatch => {
    dispatch(fetch_begin());
    const request = axios({
      method: 'GET',
      url: api,
      headers: [],
    });
    return request
      .then(function(response) {
        console.log('action fetchAnnouncements');
        console.log(response.data);
        dispatch(fetch_success(response.data));
      })
      .catch(function(error) {
        console.log(error);
        dispatch(fetch_error(error));
      });
  };
}

export function postAnnouncements(data) {
  return dispatch => {
    dispatch(post_begin());
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
        dispatch(post_success(response.data));
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
        dispatch(post_error(error));
      });
  };
}

export function putAnnouncementId(id, data) {
  return dispatch => {
    dispatch(put_begin());
    const request = axios({
      method: 'PUT',
      url: `${api}/${id}`,
      headers: [],
      data: data,
    });
    return request
      .then(function(response) {
        console.log('action putAnnouncements');
        console.log(response.data);
        dispatch(put_success(response.data));
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
        dispatch(put_error(error));
      });
  };
}

export function deleteAnnouncementId(id) {
  return dispatch => {
    dispatch(delete_begin());
    const request = axios({
      method: 'DELETE',
      url: `${api}/${id}`,
      headers: [],
    });
    return request
      .then(function(response) {
        console.log('action fetchAnnouncements');
        console.log(response.data);
        dispatch(delete_success(response.data));
      })
      .catch(function(error) {
        console.log(error);
        dispatch(delete_error(error));
      });
  };
}
