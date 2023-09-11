import { DispatchType } from '../../hooks/hooks';
import { createCart, getCart } from '../../services/customerRequests';
import { updateCartReducer } from '../slices/cartSlice';

const getCartThunk = () => async (dispatch: DispatchType) => {
  try {
    const response = await getCart();
    console.log('getCartThunk if cart exist', response);
    dispatch(updateCartReducer(response.body));
  } catch (e) {
    const response = await createCart('USD');
    console.log("getCartThunk if cart doesn't exist", response);
    dispatch(updateCartReducer(response.body));
  }
};

export default getCartThunk;
