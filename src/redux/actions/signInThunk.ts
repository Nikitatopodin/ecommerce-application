import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { message } from 'antd';
import { DispatchType } from '../../hooks/hooks';
import { signIn } from '../../services/customerRequests';
import { loginReducer } from '../slices/authorizationSlice';
import getCartThunk from './getCartThunk';

const signInThunk =
  (
    values: CustomerSignin,
    setLoginError?: (isLoginError: boolean) => void,
    successMessage?: string,
  ) =>
  async (dispatch: DispatchType) => {
    try {
      const response = await signIn(values);
      const userData = response.body.customer;
      dispatch(loginReducer({ isAuthorized: true, userData }));
      dispatch(getCartThunk());
      if (successMessage) {
        message.success(`${successMessage}`);
      }
    } catch (e) {
      if (setLoginError) {
        setLoginError(true);
      }
    }
  };

export default signInThunk;
