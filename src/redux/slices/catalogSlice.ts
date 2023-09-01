import { ProductProjection } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';

interface ICatalogData {
  dataProducts: ProductProjection[] | [];
  currentCtegory: string;
  settings: {
    sort: string | null;
    filter: string;
  };
}

const initialState: ICatalogData = {
  dataProducts: [],
  currentCtegory: '',
  settings: {
    sort: null,
    filter: '',
  },
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    addDataCatalog(state, action) {
      state.dataProducts = action.payload;
    },
    addCurrentCategory(state, action) {
      state.currentCtegory = action.payload;
    },
    addSortCatalog(state, action) {
      state.settings.sort = action.payload;
    },
  },
});

export const { addDataCatalog, addCurrentCategory, addSortCatalog } =
  catalogSlice.actions;

export default catalogSlice.reducer;
