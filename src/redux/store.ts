import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authorization from './slices/authorizationSlice';
import navMenu from './slices/navMenuSlice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  authorization,
  navMenu,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = setupStore();
