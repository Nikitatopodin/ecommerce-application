import { message } from 'antd';
import { DispatchType } from '../../hooks/hooks';
import { removeCartItem } from '../../services/customerRequests';
import { updateCartReducer } from '../slices/cartSlice';

const removeCartItemThunk =
  (
    version: number,
    cartId: string,
    lineItemId: string,
    currencyCode: string,
    centAmount: number,
    quantity?: number,
  ) =>
  (dispatch: DispatchType) => {
    try {
      removeCartItem(
        version,
        cartId,
        lineItemId,
        currencyCode,
        centAmount,
        quantity,
      )
        .then((response) => {
          dispatch(
            updateCartReducer({
              ...response.body,
              version: response.body.version,
            }),
          );
          message.success('The item has been removed from your cart.');
        })
        .catch(() => {
          message.error('Something went wrong, please try again');
        });
    } catch (e) {
      console.log(e);
    }
  };

export default removeCartItemThunk;
