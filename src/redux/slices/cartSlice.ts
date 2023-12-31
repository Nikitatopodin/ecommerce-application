import { createSlice } from '@reduxjs/toolkit';
import { Cart } from '@commercetools/platform-sdk';

export interface IInitialState {
  cart: Cart | null;
}

const initialState: IInitialState = {
  cart: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartReducer(state, action) {
      state.cart = action.payload;
    },
  },
});

export const { updateCartReducer } = cartSlice.actions;

export default cartSlice.reducer;
