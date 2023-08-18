import { createSlice } from '@reduxjs/toolkit';

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    isAuthorized: JSON.parse(localStorage.getItem('isAuthorized') || 'false'),
  },
  reducers: {
    loginReducer(state, action) {
      state.isAuthorized = action.payload;
      localStorage.setItem('isAuthorized', action.payload);
    },
  },
});

export const { loginReducer } = authorizationSlice.actions;

export default authorizationSlice.reducer;
