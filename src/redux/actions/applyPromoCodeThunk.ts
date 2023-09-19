import { message } from 'antd';
import { DispatchType } from '../../hooks/hooks';
import { usePromoCode } from '../../services/customerRequests';
import { updateCartReducer } from '../slices/cartSlice';

interface IProps {
  id: string;
  version: number;
  promoCode: string;
  setPromoCode: (promoCode: string) => void;
}

const applyPromoCodeThunk =
  ({ id, version, promoCode, setPromoCode }: IProps) =>
  (dispatch: DispatchType) => {
    try {
      usePromoCode(id, version, promoCode)
        .then((response) => {
          dispatch(updateCartReducer(response.body));
          setPromoCode('');
          message.success('Promo code applied');
        })
        .catch(() => {
          message.error('Please enter the promo code');
        });
    } catch (e) {
      console.log(e);
    }
  };
export default applyPromoCodeThunk;
