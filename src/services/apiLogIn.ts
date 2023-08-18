import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import apiRoot from './apiRoot';

function logIn(userData: CustomerSignin) {
  return apiRoot.me().login().post({ body: userData }).execute();
}

export default logIn;
