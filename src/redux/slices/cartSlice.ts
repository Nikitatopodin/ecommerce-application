import { createSlice } from '@reduxjs/toolkit';
import { Cart } from '@commercetools/platform-sdk';

interface IInitialState {
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
      state.cart = action.payload.cart;
    },
  },
});

export const { updateCartReducer } = cartSlice.actions;

export default cartSlice.reducer;
