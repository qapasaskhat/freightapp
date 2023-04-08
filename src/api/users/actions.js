//const api = 'http://gruz.viker.kz/api/users';
const api = 'http://gruz.viker.kz/api/check';
const apiPut = 'http://gruz.viker.kz/api/users';

import React from 'react';
import {Alert} from 'react-native';
import axios from 'axios';
import store from '../../api/store';
import {fetchAnnouncementsId,fetchAnnouncements} from '../Announcements/actions'
import {fetchCity} from '../city/actions'
import firebase from 'react-native-firebase'

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

export function fetchUser(token, role, city_id) {
  const { cities: { cityData } } = store.getState();

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
      .then((response) => {
        console.log('action fetchUser');
        console.log(response.data);
        if(response.status === 200){
          dispatch(fetch_success_users(response.data))
          console.log('cityData', cityData)

          cityData && cityData.data && cityData.data.map(item=>{
            if(item.id === response.data.city_id){
              console.log(item.name,'cityid')
              dispatch({ type: "GET_CITY_NAME", payload: {
                id: item.id,
                name: item.name
              } })
            }
          })

          role === 1 &&  dispatch(fetchAnnouncementsId(response.data.id, token, 1))
          role === 0 && dispatch(fetchAnnouncements(token, 1, city_id ? city_id : response.data.city_id))
          role ===0 && 
          firebase.messaging().subscribeToTopic(`gruzz${response.data.city_id}`)
          .then((res)=>{
            console.log('Уведомление включено')
          })
          .catch((error)=>{
            console.log('./././././././././././././././././././././././././././')
            console.log('error')
            console.log(error)
            console.log('./././././././././././././././././././././././././././')
          }) 
        }
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
        //Alert.alert('Ошибка', error.toString());
        dispatch(fetch_error_users(error));
      });
  };
}

export function postUser(data) {
  const {
    login: {token},
  } = store.getState();
  return dispatch => {
    dispatch(post_begin_users());
    const request = axios({
      method: 'POST',
      url: api,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export function putUser(id, data, token) {

  return dispatch => {
    dispatch(put_begin_users());
    const request = axios({
      method: 'POST',
      url: `${apiPut}/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

        dispatch(put_error_users(error));
      });
  };
}
