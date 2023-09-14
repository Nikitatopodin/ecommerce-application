import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  cards: string[][];
}

const initialState: IInitialState = {
  cards: [],
};

const homePageCarouselSlice = createSlice({
  name: 'homePageCarousel',
  initialState,
  reducers: {
    carouselCardsReducer(state, action) {
      console.log('reducer', action.payload);
      state.cards = action.payload;
    },
  },
});

export const { carouselCardsReducer } = homePageCarouselSlice.actions;

export default homePageCarouselSlice.reducer;
