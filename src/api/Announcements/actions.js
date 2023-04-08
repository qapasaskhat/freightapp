const api = 'http://gruz.viker.kz/api/announcements';

import axios from 'axios';
import React from 'react';
import firebase from 'react-native-firebase'

import {Alert} from 'react-native';
export const FETCH_BEGIN = 'FETCH_BEGIN';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCH_BEGIN_ORDERS_ID = 'FETCH_BEGIN_ORDERS_ID';
export const FETCH_SUCCESS_ORDERS_ID = 'FETCH_SUCCESS_ORDERS_ID';
export const FETCH_ERROR_ORDERS_ID = 'FETCH_ERROR_ORDERS_ID';
export const POST_BEGIN = 'POST_BEGIN';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_ERROR = 'POST_ERROR';
export const PUT_BEGIN = 'PUT_BEGIN';
export const PUT_SUCCESS = 'PUT_SUCCESS';
export const PUT_ERROR = 'PUT_ERROR';
export const DELETE_BEGIN = 'DELETE_BEGIN';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_ERROR = 'DELETE_ERROR';
export const FETCH_SUCCESS_ADD = 'FETCH_SUCCESS_ADD'
export const FETCH_SUCCESS_ADD_ORDERS_ID = 'FETCH_SUCCESS_ADD_ORDERS_ID'
import store from '../../api/store';

export const fetch_begin = () => ({
  type: FETCH_BEGIN,
});
export const fetch_success = (data, page) => ({
  type: FETCH_SUCCESS,
  payload: {data},
  page: page
});
export const fetch_success_add = (data)=>({
  type: FETCH_SUCCESS_ADD,
  payload: {data}
})
export const fetch_error = error => ({
  type: FETCH_ERROR,
  payload: {error},
});

export const fetch_begin_orders_id = () => ({
  type: FETCH_BEGIN_ORDERS_ID,
});
export const fetch_success_orders_id = data => ({
  type: FETCH_SUCCESS_ORDERS_ID,
  payload: {data},
});
export const fetch_success_add_orders_id = data =>({
  type: FETCH_SUCCESS_ADD_ORDERS_ID,
  payload: {data}
})
export const fetch_error_orders_id = error => ({
  type: FETCH_ERROR_ORDERS_ID,
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

export function fetchAnnouncements(token,page,city_id) {
  firebase.notifications().setBadge(0)
  console.log('fetchAnnouncements', city_id)
  var url = ''
  city_id ? url = `http://gruz.viker.kz/api/announcements?page=${page}&city_id=${city_id}`
  : url = `http://gruz.viker.kz/api/announcements?page=${page}`
  return dispatch => {
    page === 1 && dispatch(fetch_begin());
    const request = axios({
      method: 'GET',
      url:  url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request
      .then(function(response) {
       // console.log('action fetchAnnouncements');
        console.log(response.data);
        page === 1? dispatch(fetch_success(response.data.data, page))
        : dispatch(fetch_success_add(response.data.data))
      })
      .catch((error)=> {
        if(error.response.status === 429){
          setTimeout(() => {
            fetchAnnouncements(token,page)
          }, 500);
        }
        console.log(error);
        dispatch(fetch_error(error));
      });
  };
}

export function fetchAnnouncementsId(id,token,page) {

  return dispatch => {
    page === 1 && dispatch(fetch_begin_orders_id());
    const request = axios({
      method: 'GET',
      url: `${api}/user/${id}?page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request
      .then(function(response) {
        console.log('action fetchAnnouncementsId');
        console.log(response.data);
        page === 1 ? dispatch(fetch_success_orders_id(response.data))
        : dispatch(fetch_success_add_orders_id(response.data))
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
        console.log(error);
        //Alert.alert('Ошибка', error.toString());

        dispatch(fetch_error_orders_id(error));
      });
  };
}

export function postAnnouncements(data,token) {
  return dispatch => {
    dispatch(post_begin());
    const request = axios({
      method: 'POST',
      url: api,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request
      .then(function(response) {
        console.log('action postAnnouncements');
        console.log(response.data);
        dispatch(post_success(response.data));
        dispatch(fetchAnnouncementsId(response.data.data.user_id,token,1));
      })
      .catch(function(error) {
        // if (error.response) {
        //   // The request was made and the server responded with a status code
        //   // that falls out of the range of 2xx
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        // } else if (error.request) {
        //   // The request was made but no response was received
        //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //   // http.ClientRequest in node.js
        //   console.log(error.request);
        // } else {
        //   // Something happened in setting up the request that triggered an Error
        //   console.log('Error', error.message);
        // }
        // Alert.alert('Ошибка', error.toString());
        console.log(error);
        dispatch(post_error(error));
      });
  };
}

export function putAnnouncementId(id, data,token) {

  return dispatch => {
    
    dispatch(put_begin());
    const request = axios({
      method: 'POST',
      url: `${api}/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request
      .then(function(response) {
        console.log('action putAnnouncements');
        console.log(response.data);
        dispatch(put_success(response.data));
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error)
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error);
        Alert.alert('Ошибка', error.toString());

        dispatch(put_error(error));
      });
  };
}

export function deleteAnnouncementId(id,token) {

  return dispatch => {
    dispatch(delete_begin());
    const request = axios({
      method: 'DELETE',
      url: `${api}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request
      .then(function(response) {
        console.log('action fetchAnnouncements');
        console.log(response.data);
        dispatch(delete_success(response.data));
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
        Alert.alert('Ошибка', error.toString());

        dispatch(delete_error(error));
      });
  };
}
