const api = 'http://gruz.viker.kz/api/announcements/user/';

import axios from 'axios';
import React from 'react';
import {Alert} from 'react-native';
export const FETCH_BEGIN_ARCHIVE = 'FETCH_BEGIN_ARCHIVE';
export const FETCH_SUCCESS_ARCHIVE = 'FETCH_SUCCESS_ARCHIVE';
export const FETCH_ERROR_ARCHIVE = 'FETCH_ERROR_ARCHIVE';
export const DELETE_BEGIN_ARCHIVE = 'DELETE_BEGIN_ARCHIVE';
export const DELETE_SUCCESS_ARCHIVE = 'DELETE_SUCCESS_ARCHIVE';
export const DELETE_ERROR_ARCHIVE = 'DELETE_ERROR_ARCHIVE';
import store from '../../api/store';

export const fetch_begin_archive = () => ({
  type: FETCH_BEGIN_ARCHIVE,
});
export const fetch_success_archive = data => ({
  type: FETCH_SUCCESS_ARCHIVE,
  payload: {data},
});
export const fetch_error_archive = error => ({
  type: FETCH_ERROR_ARCHIVE,
  payload: {error},
});

export function fetchArchive(id) {
  const {
    login: {token},
  } = store.getState();

  return dispatch => {
    dispatch(fetch_begin_archive());
    const request = axios({
      method: 'GET',
      url: api + `${id}/archived`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request
      .then(function(response) {
        console.log('action fetchArchive', response.data);
        dispatch(fetch_success_archive(response.data));
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error)
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
        dispatch(fetch_error_archive(error));
      });
  };
}
