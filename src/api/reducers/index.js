import {combineReducers} from 'redux';
import announcements from '../Announcements/reducers';
import cities from '../city/reducers';
import login from '../login/reducers';
import register from '../register/reducers';
import codes from '../codes/reducers';
import chats from '../chats/reducers';
import users from '../users/reducers';
import support from '../supportMessages/reducers';
import archive from '../archive/reducers';

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

export default rootRedusers;
