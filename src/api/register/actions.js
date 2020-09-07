import axios from 'axios';
import React from 'react';
import {Alert} from 'react-native';
const api = 'http://gruz.sport-market.kz/api/sanctum/register';

export const POST_BEGIN_REGISTER = 'POST_BEGIN_REGISTER';
export const POST_SUCCESS_REGISTER = 'POST_SUCCESS_REGISTER';
export const POST_ERROR_REGISTER = 'POST_ERROR_REGISTER';

export const post_begin_register = () => ({
  type: POST_BEGIN_REGISTER,
});
export const post_success_register = data => ({
  type: POST_SUCCESS_REGISTER,
  payload: {data},
});
export const post_error_register = error => ({
  type: POST_ERROR_REGISTER,
  payload: {error},
});

export function postRegister(user, navigationPress) {
  return dispatch => {
    dispatch(post_begin_register());
    const request = axios({
      method: 'POST',
      headers: [],
      data: user,
      url: api,
    });
    return request
      .then(function(response) {
        console.log(response.data);
        dispatch(post_success_register(response.data));
        Alert.alert(
          'Регистрация прошла успешно! ',
          '',
          [
            {
              text: 'OK',
              onPress: () => {
                navigationPress();
              },
            },
          ],
          {cancelable: false},
        );
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          if (error.response.data.error.phone) {
            Alert.alert('Ошибка', error.response.data.error.phone.toString());
          }

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

        dispatch(post_error_register(error));
      });
  };
}
