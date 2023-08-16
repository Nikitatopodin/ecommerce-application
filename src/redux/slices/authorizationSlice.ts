import { createSlice } from '@reduxjs/toolkit';

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    loginReducer(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { loginReducer } = authorizationSlice.actions;

export default authorizationSlice.reducer;
