import { createSlice } from '@reduxjs/toolkit';

const productInfoSlice = createSlice({
  name: 'productInfo',
  initialState: {
    name: 'name',
    images: [{ url: 'unknown' }, { url: 'unknown' }],
    description: 'description',
    prices: [{ value: { centAmount: 0 } }, { value: { centAmount: 0 } }],
  },
  reducers: {
    productInfoReducer(state, action) {
      state.name = action.payload.name;
      state.images = action.payload.images;
      state.description = action.payload.description;
      state.prices = action.payload.prices;
    },
  },
});

export const { productInfoReducer } = productInfoSlice.actions;

export default productInfoSlice.reducer;
