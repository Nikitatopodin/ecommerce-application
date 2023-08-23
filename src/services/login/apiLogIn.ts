import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import createApiRoot from './apiRoot';

function signIn(userData: CustomerSignin) {
  const apiPasswordRoot = createApiRoot(userData.email, userData.password);
  return apiPasswordRoot.me().login().post({ body: userData }).execute();
}

export default signIn;
