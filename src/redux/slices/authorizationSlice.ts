import { createSlice } from '@reduxjs/toolkit';

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    loginReducer(state) {
      state.isLoggedIn = true;
    },
    logoutReducer(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { loginReducer, logoutReducer } = authorizationSlice.actions;

export default authorizationSlice.reducer;
