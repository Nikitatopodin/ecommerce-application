import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { DispatchType } from '../../hooks/hooks';
import { getProfile } from '../../services/customerRequests';
import { loginReducer } from '../slices/authorizationSlice';
import getCartThunk from "./getCartThunk";

const initializeAppThunk = () => async (dispatch: DispatchType) => {
  const isAuthorized = localStorage.getItem('isAuthorized');
  if (isAuthorized) {
    try {
      const profileResponse = await getProfile();
      const userData: Customer = profileResponse.body;
      dispatch(loginReducer({ isAuthorized: true, userData }));
      dispatch(getCartThunk());
    } catch (e) {
      console.log(e);
    }
  }
};

export default initializeAppThunk;
