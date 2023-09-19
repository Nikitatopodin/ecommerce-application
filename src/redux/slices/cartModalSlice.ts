import { createSlice } from '@reduxjs/toolkit';

const cartModalSlice = createSlice({
  name: 'cartModal',
  initialState: {
    isOpen: false,
  },
  reducers: {
    isOpenCartModalReducer(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const { isOpenCartModalReducer } = cartModalSlice.actions;

export default cartModalSlice.reducer;
