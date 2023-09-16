import { message } from 'antd';
import { changeProductQuantity } from '../../services/customerRequests';
import { updateCartReducer } from '../slices/cartSlice';
import { DispatchType } from '../../hooks/hooks';

const changeProductQuantityThunk =
  (version: number, lineItemId: string, cartId: string, quantity: number) =>
  (dispatch: DispatchType) => {
    try {
      changeProductQuantity(version, lineItemId, cartId, quantity)
        .then((response) => {
          dispatch(updateCartReducer(response.body));
        })
        .catch(() => {
          message.error('Something went wrong, please try again');
        });
    } catch (e) {
      console.log(e);
    }
  };
export default changeProductQuantityThunk;
