import { createSlice } from '@reduxjs/toolkit';

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    isAuthorized: JSON.parse(localStorage.getItem('isAuthorized') || 'false'),
    userData: null,
  },
  reducers: {
    loginReducer(state, action) {
      state.isAuthorized = action.payload.isAuthorized;
      state.userData = action.payload.userData;
      console.log('data', state.userData);
      localStorage.setItem('isAuthorized', action.payload.isAuthorized);
    },
  },
});

export const { loginReducer } = authorizationSlice.actions;

export default authorizationSlice.reducer;
