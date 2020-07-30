const api = 'http://gruz.sport-market.kz/api/cities'

import axios from 'axios'

export const FETCH_BEGIN_CITY = 'FETCH_BEGIN_CITY'
export const FETCH_SUCCESS_CITY = 'FETCH_SUCCESS_CITY'
export const FETCH_ERROR_CITY = 'FETCH_ERROR_CITY'

export const fetch_begin_city = () =>({
    type: FETCH_BEGIN_CITY
})
export const fetch_success_city = (data) =>({
    type: FETCH_SUCCESS_CITY,
    payload: {data}
})
export const fetch_error_city = (error) =>({
    type: FETCH_ERROR_CITY,
    payload: {error}
})

export function fetchCity(){
    return dispatch=>{
        dispatch(fetch_begin_city())
        const request = axios({
            method: 'GET',
            url: api,
            headers: []
        })
        return request
        .then(function (response){
            console.log('action fetchAnnouncements')
            console.log(response.data)
            dispatch(fetch_success_city(response.data))
        }).catch(function(error){
            console.log(error)
            dispatch(fetch_error_city(error))
        })
    }
}