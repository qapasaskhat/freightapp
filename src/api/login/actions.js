import axios from 'axios';
import React from 'react';
import {Alert} from 'react-native';
import {fetchUser} from '../users/actions';
import {fetchCity} from '../city/actions'

import AsyncStorage from '@react-native-community/async-storage';

const api = 'http://gruz.sport-market.kz/api/sanctum/token';
//const api = 'http://gruz.sport-market.kz/api/check';

//11|DhLwiMg7r4AqSgnbbRYdYqMz1PVSpH5NK8o8yCOIGr7wotYLP2r4NtmiUj5fprY8LWyJ0lV3pPkXmxTv

export const FETCH_BEGIN_LOGIN = 'FETCH_BEGIN_LOGIN';
export const FETCH_SUCCESS_LOGIN = 'FETCH_SUCCESS_LOGIN';
export const FETCH_ERROR_LOGIN = 'FETCH_ERROR_LOGIN';

export const fetch_begin_login = () => ({
  type: FETCH_BEGIN_LOGIN,
});
export const fetch_success_login = (data,role) => ({
  type: FETCH_SUCCESS_LOGIN,
  payload: {data,role},
});
export const fetch_error_login = error => ({
  type: FETCH_ERROR_LOGIN,
  payload: {error},
});

export function fetchLogin(user,role) {
  return dispatch => {
    dispatch(fetchCity())
    dispatch(fetch_begin_login());
    const request = axios({
      method: 'POST',
      data: user,
      url: api,
    });
    return request
      .then(async function(response) {
        console.log(response.data);
        console.log('role', role)
        dispatch(fetch_success_login(response.data.token,role));
        dispatch(fetchUser(response.data.token,role));
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          if(error.response.status === 401){
            Alert.alert('Уведомление', 'Неверный логин или пароль');
          }
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
        Alert.alert('Ошибка', 'Неверный логин или пароль');
        dispatch(fetch_error_login(error));
      });
  };
}
