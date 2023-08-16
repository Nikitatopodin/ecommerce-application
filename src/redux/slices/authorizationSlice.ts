import { createSlice } from '@reduxjs/toolkit';

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    isAuthorized: false,
  },
  reducers: {
    loginReducer(state, action) {
      state.isAuthorized = action.payload;
    },
  },
});

export const { loginReducer } = authorizationSlice.actions;

export default authorizationSlice.reducer;
