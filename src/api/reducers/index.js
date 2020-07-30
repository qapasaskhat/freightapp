import { combineReducers } from 'redux'
import announcements from '../Announcements/reducers'
import cities from '../city/reducers'
import login from '../login/reducers'
import register from '../register/reducers'

const rootRedusers = combineReducers({
    announcements,
    cities,
    login,
    register
})

export default rootRedusers