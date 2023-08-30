import { createSlice } from '@reduxjs/toolkit';
import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

interface IInitialState {
  isAuthorized: boolean;
  userData: Customer | null;
}

const initialState: IInitialState = {
  isAuthorized: JSON.parse(localStorage.getItem('isAuthorized') || 'false'),
  userData: null,
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    loginReducer(state, action) {
      state.isAuthorized = action.payload.isAuthorized;
      state.userData = action.payload.userData;
      localStorage.setItem('isAuthorized', action.payload.isAuthorized);
    },
    setProfileData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const { loginReducer, setProfileData } = authorizationSlice.actions;

export default authorizationSlice.reducer;
