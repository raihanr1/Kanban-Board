import { combineReducers } from 'redux';
import { userReducer } from './reducer/reducer';

export default combineReducers({
  user: userReducer,
});
