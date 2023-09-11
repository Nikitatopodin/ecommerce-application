import { message } from 'antd';
import { DispatchType } from '../../hooks/hooks';
import { updateCart } from '../../services/customerRequests';
import { setProfileData } from '../slices/authorizationSlice';

const updateCartThunk =
  (
    version: number,
    productId: string,
    variantId: number,
    quantity: number,
    cartId: string,
  ) =>
  async (dispatch: DispatchType) => {
    try {
      updateCart(version, productId, variantId, quantity, cartId)
        .then((response) => {
          dispatch(
              // todo: replace with new reducer setCart
            setProfileData({
              ...response.body,
              version: response.body.version,
            }),
          );
          message.success('Great choice! You\'ve successfully added the item to your cart.');
        })
        .catch(() => {
          message.error('Something went wrong, please try again');
        });
    } catch (e) {
      console.log(e);
    }
  };

export default updateCartThunk;
