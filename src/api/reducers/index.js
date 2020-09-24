import {combineReducers} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import announcements from '../Announcements/reducers';
import cities from '../city/reducers';
import login from '../login/reducers';
import register from '../register/reducers';
import codes from '../codes/reducers';
import chats from '../chats/reducers';
import users from '../users/reducers';
import support from '../supportMessages/reducers';
import archive from '../archive/reducers';
import appReducer from './appReducer'

const rootRedusers = combineReducers({
  announcements,
  cities,
  login,
  register,
  codes,
  chats,
  users,
  support,
  archive,
});

const config = {
  key: 'primary',
  storage: AsyncStorage,
  whitelist: ['login','appReducer'], // only login will be persisted
  //transform: [saveSubsetBlacklistFilter],
  //blacklist: ['rootRedusers'],
  timeout: 0,
};

const reducer = persistCombineReducers(config, {
  announcements,
  cities,
  login,
  register,
  codes,
  chats,
  users,
  support,
  archive,
  appReducer
});

export default reducer;
