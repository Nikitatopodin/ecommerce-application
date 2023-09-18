import { createSlice } from '@reduxjs/toolkit';

export interface IPromoCode {
  id: string;
  title: string;
  description: string;
  code: string;
}

interface IPromoCodesState {
  promoCodes: IPromoCode[];
}

const initialState: IPromoCodesState = { promoCodes: [] };

const promoCodesSlice = createSlice({
  name: 'promoCodes',
  initialState,
  reducers: {
    addPromoCodes(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.promoCodes = action.payload;
    },
  },
});

export const { addPromoCodes } = promoCodesSlice.actions;

export default promoCodesSlice.reducer;
