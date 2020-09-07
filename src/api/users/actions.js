//const api = 'http://gruz.sport-market.kz/api/users';
const api = 'http://gruz.sport-market.kz/api/check';
const apiPut = 'http://gruz.sport-market.kz/api/users';

import React from 'react';
import {Alert} from 'react-native';
import axios from 'axios';
import store from '../../api/store';

export const FETCH_BEGIN_USERS = 'FETCH_BEGIN_USERS';
export const FETCH_SUCCESS_USERS = 'FETCH_SUCCESS_USERS';
export const FETCH_ERROR_USERS = 'FETCH_ERROR_USERS';
export const POST_BEGIN_USERS = 'POST_BEGIN_USERS';
export const POST_SUCCESS_USERS = 'POST_SUCCESS_USERS';
export const POST_ERROR_USERS = 'POST_ERROR_USERS';
export const PUT_BEGIN_USERS = 'PUT_BEGIN_USERS';
export const PUT_SUCCESS_USERS = 'PUT_SUCCESS_USERS';
export const PUT_ERROR_USERS = 'PUT_ERROR_USERS';

export const fetch_begin_users = () => ({
  type: FETCH_BEGIN_USERS,
});
export const fetch_success_users = data => ({
  type: FETCH_SUCCESS_USERS,
  payload: {data},
});
export const fetch_error_users = error => ({
  type: FETCH_ERROR_USERS,
  payload: {error},
});

export const post_begin_users = () => ({
  type: POST_BEGIN_USERS,
});
export const post_success_users = data => ({
  type: POST_SUCCESS_USERS,
  //payload: {data}
});
export const post_error_users = error => ({
  type: POST_ERROR_USERS,
  payload: {error},
});

export const put_begin_users = () => ({
  type: PUT_BEGIN_USERS,
});
export const put_success_users = data => ({
  type: PUT_SUCCESS_USERS,
  //payload: {data}
});
export const put_error_users = error => ({
  type: PUT_ERROR_USERS,
  payload: {error},
});

axios.interceptors.request.use(async config => {
  const {
    login: {token},
  } = store.getState();

  const tokenId = `Bearer ${token}`;
  config.headers.Authorization = tokenId;

  return config;
});

export function fetchUser() {
  const {
    login: {token},
  } = store.getState();

  //console.log('reducerLogin ', token);
  return dispatch => {
    dispatch(fetch_begin_users());
    const request = axios({
      method: 'GET',
      url: api,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request
      .then(function(response) {
        console.log('action fetchUser');
        console.log(response.data);
        dispatch(fetch_success_users(response.data));
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
        Alert.alert('Ошибка', error.toString());
        dispatch(fetch_error_users(error));
      });
  };
}

export function postUser(data) {
  return dispatch => {
    dispatch(post_begin_users());
    const request = axios({
      method: 'POST',
      url: api,
      headers: [],
      data: data,
    });
    return request
      .then(function(response) {
        console.log('action postUser');
        console.log(response.data);
        dispatch(post_success_users(response.data));
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
        Alert.alert('Ошибка', error.toString());

        dispatch(post_error_users(error));
      });
  };
}

export function putUser(id, data) {
  return dispatch => {
    dispatch(put_begin_users());
    const request = axios({
      method: 'PUT',
      url: `${apiPut}/${id}`,
      data: data,
    });
    return request
      .then(function(response) {
        console.log('action putUser');
        console.log(response.data);
        dispatch(put_success_users(response.data));
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
        Alert.alert('Ошибка', error.toString());

        dispatch(put_error_users(error));
      });
  };
}
