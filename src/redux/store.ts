import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from './slices/authorizationSlice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  authorization: authorizationReducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = setupStore();
