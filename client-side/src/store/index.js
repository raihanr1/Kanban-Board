import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './root-reducer/index';
export const store = createStore(reducer, applyMiddleware(thunk));
