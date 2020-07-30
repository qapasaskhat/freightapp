import axios from 'axios'

const api = ''

export const FETCH_BEGIN_LOGIN = 'FETCH_BEGIN_LOGIN'
export const FETCH_SUCCESS_LOGIN = 'FETCH_SUCCESS_LOGIN'
export const FETCH_ERROR_LOGIN = 'FETCH_ERROR_LOGIN'

export const fetch_begin_login = ()=>({
    type: FETCH_BEGIN_LOGIN
})
export const fetch_success_login = (data)=>({
    type: FETCH_BEGIN_LOGIN,
    payload: {data}
})
export const fetch_error_login = (error)=>({
    type: FETCH_BEGIN_LOGIN,
    payload: {error}
})

export function fetchLogin(user){
    return dispatch=>{
        dispatch(fetch_begin_login())
        const request = axios({
            method: 'POST',
            headers: [],
            params: {
                phone: user.phone,
                password: user.password
            },
            url: api
        })
        return request
        .then(function(response){
            console.log(response.data)
            dispatch(fetch_success_login(response.data))
        }).catch(function(error){
            dispatch(fetch_error_login(error))
        })
    }
}
