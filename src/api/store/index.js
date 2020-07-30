import {
    createStore,
    applyMiddleware
} from 'redux'

import thunk from 'redux-thunk'
import rootRedusers from '../reducers'

const store = createStore(
    rootRedusers,
    applyMiddleware(thunk)
)

export default store