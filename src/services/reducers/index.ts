import { combineReducers } from 'redux';
import { reducer as burgerReducer } from './burger';

export const rootReducer = combineReducers({
    burger: burgerReducer,
  });
