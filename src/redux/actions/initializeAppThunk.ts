import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { DispatchType } from '../../hooks/hooks';
import { getProfile } from '../../services/customerRequests';
import { loginReducer } from '../slices/authorizationSlice';

const initializeAppThunk = () => async (dispatch: DispatchType) => {
  const isAuthorized = localStorage.getItem('isAuthorized');
  if (isAuthorized) {
    try {
      const response = await getProfile();
      const userData: Customer = response.body;
      dispatch(loginReducer({ isAuthorized: true, userData }));
    } catch (e) {
      console.log(e);
    }
  }
};

export default initializeAppThunk;
