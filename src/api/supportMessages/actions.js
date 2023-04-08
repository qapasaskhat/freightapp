const api = 'http://gruz.viker.kz/api/supportMessages';

import axios from 'axios';
import store from '../../api/store';

import React from 'react';
import {Alert} from 'react-native';
export const FETCH_BEGIN_SUPPORT_MESSAGES = 'FETCH_BEGIN_SUPPORT_MESSAGES';
export const FETCH_SUCCESS_SUPPORT_MESSAGES = 'FETCH_SUCCESS_SUPPORT_MESSAGES';
export const FETCH_ERROR_SUPPORT_MESSAGES = 'FETCH_ERROR_SUPPORT_MESSAGES';
export const POST_BEGIN_SUPPORT_MESSAGES = 'POST_BEGIN_SUPPORT_MESSAGES';
export const POST_SUCCESS_SUPPORT_MESSAGES = 'POST_SUCCESS_SUPPORT_MESSAGES';
export const POST_ERROR_SUPPORT_MESSAGES = 'POST_ERROR_SUPPORT_MESSAGES';

export const fetch_begin_support_messages = () => ({
  type: FETCH_BEGIN_SUPPORT_MESSAGES,
});
export const fetch_success_support_messages = data => ({
  type: FETCH_SUCCESS_SUPPORT_MESSAGES,
  payload: {data},
});
export const fetch_error_support_messages = error => ({
  type: FETCH_ERROR_SUPPORT_MESSAGES,
  payload: {error},
});

export const post_begin_support_messages = () => ({
  type: POST_BEGIN_SUPPORT_MESSAGES,
});
export const post_success_support_messages = data => ({
  type: POST_SUCCESS_SUPPORT_MESSAGES,
  //payload: {data}
});
export const post_error_support_messages = error => ({
  type: POST_ERROR_SUPPORT_MESSAGES,
  payload: {error},
});

export function fetchSupportMessages() {
  const {
    login: {token},
  } = store.getState();
  return dispatch => {
    dispatch(fetch_begin_support_messages());
    const request = axios({
      method: 'GET',
      url: api,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request
      .then(function(response) {
        console.log('action fetch_support_messages');
        console.log(response.data);
        dispatch(fetch_success_support_messages(response.data));
      })
      .catch(function(error) {
        console.log(error);
        dispatch(fetch_error_support_messages(error));
      });
  };
}

export function postSupportMesssages(data,access_token) {
  const {
    login: {token},
  } = store.getState();
  return dispatch => {
    dispatch(post_begin_support_messages());
    const request = axios({
      method: 'POST',
      url: api,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      data: data,
    });
    return request
      .then(function(response) {
        console.log('action post_support_messages');
        console.log(response.data);
        dispatch(post_success_support_messages(response.data));
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
        dispatch(post_error_support_messages(error));
      });
  };
}
