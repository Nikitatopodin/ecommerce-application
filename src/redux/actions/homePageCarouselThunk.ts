import { DispatchType } from '../../hooks/hooks';
import { getProducts } from '../../services/customerRequests';
import { IProductQueryArgs } from '../../types/types';
import { carouselCardsReducer } from '../slices/homePageCarouselSlice';

const homePageCarouselThunk = () => async (dispatch: DispatchType) => {
  try {
    const carouselCards: string[] = [];
    const chunkedCarouselCards: string[][] = [];

    const queryParams: IProductQueryArgs = {
      filter: ['variants.attributes.for-main:true'],
    };

    const response = await getProducts(queryParams);
    response.body.results.forEach((card) => {
      if (card.variants[0].images) {
        carouselCards.push(card.variants[0].images[0].url);
      }
    });
    console.log('response', carouselCards);

    for (let i = 0; i < carouselCards.length; i += 3) {
      const chunk = carouselCards.slice(i, i + 3);
      chunkedCarouselCards.push(chunk);
    }
    console.log('chunked', chunkedCarouselCards);
    dispatch(carouselCardsReducer(chunkedCarouselCards));
  } catch (e) {
    console.log(e);
  }
};
export default homePageCarouselThunk;
