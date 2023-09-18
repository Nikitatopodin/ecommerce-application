import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { DispatchType } from '../../hooks/hooks';
import { getProfile } from '../../services/customerRequests';
import { loginReducer } from '../slices/authorizationSlice';
import getCartThunk from './getCartThunk';

const initializeAppThunk = () => async (dispatch: DispatchType) => {
  const isAuthorized = localStorage.getItem('isAuthorized');
  try {
    if (isAuthorized) {
      const profileResponse = await getProfile();
      const userData: Customer = profileResponse.body;
      dispatch(loginReducer({ isAuthorized: true, userData }));
    }
  } catch (e) {
    console.log(e);
  }
  dispatch(getCartThunk());
};

export default initializeAppThunk;
