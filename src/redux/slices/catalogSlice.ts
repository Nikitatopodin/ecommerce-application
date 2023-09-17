import { ProductProjection } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';

export interface ICatalogData {
  dataProducts: ProductProjection[] | [];
  dataAttributes: string[];
  settings: {
    sort: string | null;
    currentCategory: string;
    filter: string;
    attributes: string[];
    price: [number, number];
    search: string;
    totalCards: number;
    currentPage: number;
    cardsOnPage: number;
  };
}

const initialState: ICatalogData = {
  dataProducts: [],
  dataAttributes: [],
  settings: {
    sort: null,
    currentCategory: '',
    filter: '',
    attributes: [],
    price: [0.3, 5],
    search: '',
    totalCards: 21,
    currentPage: 1,
    cardsOnPage: 10,
  },
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    addDataCatalog(state, action) {
      state.dataProducts = action.payload;
    },
    addDataAttributes(state, action) {
      state.dataAttributes = action.payload;
    },
    addCurrentCategory(state, action) {
      state.settings.currentCategory = action.payload;
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
    setTotalCards(state, action) {
      state.settings.totalCards = action.payload;
    },
    setCurrentPage(state, action) {
      state.settings.currentPage = action.payload;
    },
    setCardsOnPage(state, action) {
      state.settings.cardsOnPage = action.payload;
    },
    resetFilter(state) {
      state.settings = {
        sort: null,
        currentCategory: '',
        filter: '',
        attributes: [],
        price: [0.3, 5],
        search: '',
        totalCards: 21,
        currentPage: 1,
        cardsOnPage: 10,
      };
    },
  },
});

export const {
  addDataCatalog,
  addDataAttributes,
  addCurrentCategory,
  addSortCatalog,
  setAttributes,
  changePrice,
  addSearchString,
  setTotalCards,
  setCurrentPage,
  setCardsOnPage,
  resetFilter,
} = catalogSlice.actions;

export default catalogSlice.reducer;
