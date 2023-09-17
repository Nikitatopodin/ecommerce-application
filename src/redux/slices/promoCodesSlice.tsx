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
      state.promoCodes = action.payload;
      console.log(state);
    },
  },
});

export const { addPromoCodes } = promoCodesSlice.actions;

export default promoCodesSlice.reducer;
