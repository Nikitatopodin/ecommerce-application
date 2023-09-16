import { DispatchType } from '../../hooks/hooks';
import { createCart, getCart } from '../../services/customerRequests';
import { updateCartReducer } from '../slices/cartSlice';

const getCartThunk = () => async (dispatch: DispatchType) => {
  try {
    const response = await getCart();
    dispatch(updateCartReducer(response.body));
  } catch (e) {
    const response = await createCart('USD');
    dispatch(updateCartReducer(response.body));
  }
};

export default getCartThunk;
