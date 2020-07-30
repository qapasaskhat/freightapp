import axios from 'axios'

const api = ''

export const FETCH_BEGIN_REGISTER = 'FETCH_BEGIN_REGISTER'
export const FETCH_SUCCESS_REGISTER = 'FETCH_SUCCESS_REGISTER'
export const FETCH_ERROR_REGISTER = 'FETCH_ERROR_REGISTER'

export const fetch_begin_register = ()=>({
    type: FETCH_BEGIN_REGISTER
})
export const fetch_success_register = (data)=>({
    type: FETCH_BEGIN_REGISTER,
    payload: {data}
})
export const fetch_error_register = (error)=>({
    type: FETCH_BEGIN_REGISTER,
    payload: {error}
})

export function fetchRegister(user){
    return dispatch=>{
        dispatch(fetch_begin_register())
        const request = axios({
            method: 'POST',
            headers: [],
            params: {
                phone: user.phone,
                password: user.password,
                name: user.name
            },
            url: api
        })
        return request
        .then(function(response){
            console.log(response.data)
            dispatch(fetch_success_register(response.data))
        }).catch(function(error){
            dispatch(fetch_error_register(error))
        })
    }
}
