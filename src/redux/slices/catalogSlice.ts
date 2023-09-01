import { ProductProjection } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';

interface ICatalogData {
  dataProducts: ProductProjection[] | [];
  settings: {
    sort: string | null;
    currentCtegory: string;
    filter: string;
    attributes: string[];
    price: [number, number];
    search: string;
  };
}

const initialState: ICatalogData = {
  dataProducts: [],
  settings: {
    sort: null,
    currentCtegory: '',
    filter: '',
    attributes: [],
    price: [0.3, 5],
    search: '',
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
      state.settings.currentCtegory = action.payload;
    },
    addSortCatalog(state, action) {
      state.settings.sort = action.payload;
    },
    setAttributes(state, action) {
      state.settings.attributes = action.payload;
    },
    changePrice(state, action) {
      state.settings.price = action.payload;
    },
    addSearchString(state, action) {
      state.settings.search = action.payload;
    },
    resetFilter(state) {
      state.settings = {
        sort: null,
        currentCtegory: '',
        filter: '',
        attributes: [],
        price: [0.3, 5],
        search: '',
      };
    },
  },
});

export const {
  addDataCatalog,
  addCurrentCategory,
  addSortCatalog,
  setAttributes,
  changePrice,
  addSearchString,
  resetFilter,
} = catalogSlice.actions;

export default catalogSlice.reducer;
