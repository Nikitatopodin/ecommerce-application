import { createSlice } from '@reduxjs/toolkit';
import { Cart } from '@commercetools/platform-sdk';

interface IInitialState {
  cart: Cart | null;
  initialPrice: number | null;
}

const initialState: IInitialState = {
  cart: null,
  initialPrice: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartReducer(state, action) {
      state.cart = action.payload;
    },
    setInitialPrice(state, action) {
      state.initialPrice = action.payload;
    },
  },
});

export const { updateCartReducer, setInitialPrice } = cartSlice.actions;

export default cartSlice.reducer;
