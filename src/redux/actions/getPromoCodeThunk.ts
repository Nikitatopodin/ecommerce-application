import { DispatchType } from '../../hooks/hooks';
import { getDiscountCodes } from '../../services/customerRequests';
import { addPromoCodes, IPromoCode } from '../slices/promoCodesSlice';

const getPromoCodeThunk = () => (dispatch: DispatchType) => {
  try {
    getDiscountCodes()
      .then((data) => {
        console.log('DATA', data);
        const promoCodesArr: IPromoCode[] = [];
        data.body.results.forEach((item) => {
          promoCodesArr.push({
            title: item.name!['en-US'],
            description: item.description!['en-US'],
            id: item.id,
            code: item.code,
          });
        });
        dispatch(addPromoCodes(promoCodesArr));
      })
      .catch(console.log);
  } catch (e) {
    console.log(e);
  }
};
export default getPromoCodeThunk;
