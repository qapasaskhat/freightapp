const api = 'http://gruz.sport-market.kz/api/announcements'

import axios from 'axios'

export const FETCH_BEGIN = 'FETCH_BEGIN'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_ERROR = 'FETCH_ERROR'

export const fetch_begin = () =>({
    type: FETCH_BEGIN
})
export const fetch_success = (data) =>({
    type: FETCH_SUCCESS,
    payload: {data}
})
export const fetch_error = (error) =>({
    type: FETCH_ERROR,
    payload: {error}
})

export function fetchAnnouncements(){
    return dispatch=>{
        dispatch(fetch_begin())
        const request = axios({
            method: 'GET',
            url: api,
            headers: []
        })
        return request
        .then(function (response){
            console.log('action fetchAnnouncements')
            console.log(response.data)
            dispatch(fetch_success(response.data))
        }).catch(function(error){
            console.log(error)
            dispatch(fetch_error(error))
        })
    }
}