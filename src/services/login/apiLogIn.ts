import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import createApiRoot from './apiRoot';

function logIn(userData: CustomerSignin) {
  const apiRoot = createApiRoot(userData.email, userData.password);
  return apiRoot.me().login().post({ body: userData }).execute();
}

export default logIn;
