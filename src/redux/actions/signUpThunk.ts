import { message } from 'antd';
import { DispatchType } from '../../hooks/hooks';
import { addAddressId, signIn, signUp } from '../../services/customerRequests';
import convertFormData from '../../utils/form/convertFormData';
import { loginReducer } from '../slices/authorizationSlice';
import { IRegistrationForm } from '../../types/types';

const signUpThunk =
  (values: IRegistrationForm, setSignupError: (isSignUp: boolean) => void) =>
  async (dispatch: DispatchType) => {
    signUp(convertFormData(values))
      .then(() => signIn(values))
      .then((response) => {
        const shippingAddressId = response.body.customer.addresses[0].id;
        return addAddressId(
          shippingAddressId!,
          response.body.customer.version,
          false,
        );
      })
      .then((response) => {
        if (response.body.addresses[1]) {
          const billingAddressId = response.body.addresses[1].id;
          return addAddressId(billingAddressId!, response.body.version, true);
        }
        return response;
      })
      .then((response) => {
        dispatch(
          loginReducer({
            isAuthorized: true,
            userData: response!.body,
          }),
        );
        message.success('Sign up success');
      })
      .catch(console.log)
      .catch(() => {
        setSignupError(true);
      });
  };

export default signUpThunk;
