import { message } from 'antd';
import { DispatchType } from '../../hooks/hooks';
import { addAddressId, signIn, signUp } from '../../services/customerRequests';
import convertFormData from '../../utils/formUtils/convertFormData';
import { loginReducer } from '../slices/authorizationSlice';
import { IRegistrationForm } from '../../types/types';

const signUpThunk =
  (values: IRegistrationForm, setSignupError: (isSignUp: boolean) => void) =>
  async (dispatch: DispatchType) => {
    signUp(convertFormData(values))
      .then(() => signIn(values))
      .then((response) => {
        let responseWithAddressIds;
        const shippingAddressId = response.body.customer.addresses[0].id;
        if (shippingAddressId) {
          responseWithAddressIds = addAddressId(
            shippingAddressId,
            response.body.customer.version,
            false,
          );
        }
        if (response.body.customer.addresses[1]) {
          const billingAddressId = response.body.customer.addresses[1].id;
          if (billingAddressId) {
            responseWithAddressIds = addAddressId(
              billingAddressId,
              response.body.customer.version + 1,
              true,
            );
          }
        }
        return responseWithAddressIds;
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
