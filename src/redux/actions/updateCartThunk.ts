import { message } from 'antd';
import { DispatchType } from '../../hooks/hooks';
import { addCartItem } from '../../services/customerRequests';
import getCartThunk from './getCartThunk';
import { updateCartReducer } from '../slices/cartSlice';

const updateCartThunk =
  (
    version: number,
    productId: string,
    variantId: number,
    quantity: number,
    cartId: string,
  ) =>
  (dispatch: DispatchType) => {
    try {
      dispatch(getCartThunk());
      addCartItem(version, productId, variantId, quantity, cartId)
        .then((response) => {
          dispatch(updateCartReducer(response.body));
          message.success(
            "Great choice! You've successfully added the item to your cart.",
          );
        })
        .catch(() => {
          message.error('Something went wrong, please try again');
        });
    } catch (e) {
      console.log(e);
    }
  };

export default updateCartThunk;
