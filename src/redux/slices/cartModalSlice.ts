import { createSlice } from '@reduxjs/toolkit';

const cartModalSlice = createSlice({
  name: 'cartModal',
  initialState: {
    isOpen: false,
    callback: () => console.log(),
  },
  reducers: {
    isOpenCartModalReducer(state, action) {
      state.isOpen = action.payload;
    },
    setCallbackCartModalReducer(state, action) {
      state.callback = action.payload;
    },
  },
});

export const { isOpenCartModalReducer, setCallbackCartModalReducer } =
  cartModalSlice.actions;

export default cartModalSlice.reducer;
