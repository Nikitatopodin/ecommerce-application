import { message } from 'antd';
import { DispatchType } from '../../hooks/hooks';
import { createCart, removeCart } from '../../services/customerRequests';
import getCartThunk from './getCartThunk';
import { updateCartReducer } from '../slices/cartSlice';

const removeCartThunk =
  (version: number, cartId: string) => (dispatch: DispatchType) => {
    try {
      dispatch(getCartThunk());
      removeCart(version, cartId)
        .then(() => {
          message.success('You cart has been cleared!');
          createCart('USD').then((response) => {
            dispatch(updateCartReducer(response.body));
          });
        })
        .catch(() => {
          message.error('Something went wrong, please try again');
        });
    } catch (e) {
      console.log(e);
    }
  };

export default removeCartThunk;
