const api = 'http://gruz.viker.kz/api/cities';

import AXS from 'axios';
const axios = AXS.create();
import React from 'react';
import {Alert} from 'react-native';
export const FETCH_BEGIN_CITY = 'FETCH_BEGIN_CITY';
export const FETCH_SUCCESS_CITY = 'FETCH_SUCCESS_CITY';
export const FETCH_ERROR_CITY = 'FETCH_ERROR_CITY';
export const POST_BEGIN_CITY = 'FETCH_BEGIN_CITY';
export const POST_SUCCESS_CITY = 'FETCH_SUCCESS_CITY';
export const POST_ERROR_CITY = 'FETCH_ERROR_CITY';

export const fetch_begin_city = () => ({
  type: FETCH_BEGIN_CITY,
});
export const fetch_success_city = data => ({
  type: FETCH_SUCCESS_CITY,
  payload: {data},
});
export const fetch_error_city = error => ({
  type: FETCH_ERROR_CITY,
  payload: {error},
});

export const post_begin_city = () => ({
  type: POST_BEGIN_CITY,
});
export const post_success_city = data => ({
  type: POST_SUCCESS_CITY,
  //payload: {data}
});
export const post_error_city = error => ({
  type: POST_ERROR_CITY,
  payload: {error},
});

export function fetchCity(page) {
  
  return dispatch => {
    console.log('city fetch_begin_city')
    dispatch(fetch_begin_city());

    const request = axios({
      method: 'GET',
      url: api+`?page=${page}`,
    });
    return request
      .then(function(response) {
        console.log('action city');
        console.log(response.data);
        dispatch(fetch_success_city(response.data));
      })
      .catch(function(error) {
        console.log('eerrrooorrr')
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
        console.log(error);
        Alert.alert('Ошибка', error.toString());
        dispatch(fetch_error_city(error));
      });
  };
}

export function postCity(data) {
  return dispatch => {
    dispatch(post_begin_city());
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
        dispatch(post_success_city(response.data));
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
        dispatch(post_error_city(error));
      });
  };
}
