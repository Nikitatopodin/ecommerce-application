import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { message } from 'antd';
import { DispatchType } from '../../hooks/hooks';
import { signIn } from '../../services/customerRequests';
import { loginReducer } from '../slices/authorizationSlice';

const signInThunk =
  (
    values: CustomerSignin,
    setLoginError?: (isLoginError: boolean) => void,
    successMessage?: string,
  ) =>
  async (dispatch: DispatchType) => {
    try {
      signIn(values)
        .then((response) => {
          const userData = response.body.customer;
          dispatch(loginReducer({ isAuthorized: true, userData }));
          if (successMessage) {
            message.success(`${successMessage}`);
          }
        })
        .catch(() => {
          if (setLoginError) {
            setLoginError(true);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

export default signInThunk;
