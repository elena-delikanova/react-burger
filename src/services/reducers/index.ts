import { initialState } from "../initialState";
import { combineReducers } from 'redux';

export const ingredientReducer = (state = initialState, action: any) => {
    return state;

};

export const rootReducer = combineReducers({
    ingredient: ingredientReducer,
  });
