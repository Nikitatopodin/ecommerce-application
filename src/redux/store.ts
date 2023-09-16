import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authorization from './slices/authorizationSlice';
import navMenu from './slices/navMenuSlice';
import catalog from './slices/catalogSlice';
import cart from './slices/cartSlice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  authorization,
  navMenu,
  catalog,
  cart,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = setupStore();
