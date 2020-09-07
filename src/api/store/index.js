import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import thunk from 'redux-thunk';
import rootRedusers from '../reducers';

const config = {
  key: 'primary',
  storage: AsyncStorage,
  //whitelist: ['login'], // only login will be persisted
  //transform: [saveSubsetBlacklistFilter],
  //blacklist: [],
  //timeout: 0,
};

const reducer = persistCombineReducers(config, {
  rootRedusers,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    //AsyncStorage.clear();
    state = undefined;
  }

  return reducer(state, action);
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const store = createStore(rootReducer, undefined, enhancer);
export let persistor = persistStore(store);

export default store;
