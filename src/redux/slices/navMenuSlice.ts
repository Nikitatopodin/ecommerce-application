import { createSlice } from '@reduxjs/toolkit';

const navMenuSlice = createSlice({
  name: 'navMenu',
  initialState: {
    activeKey: '',
  },
  reducers: {
    activeMenuItemsReducer(state, action) {
      state.activeKey = action.payload;
    },
  },
});

export const { activeMenuItemsReducer } = navMenuSlice.actions;

export default navMenuSlice.reducer;
