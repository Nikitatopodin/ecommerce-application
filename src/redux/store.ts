import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = setupStore();
