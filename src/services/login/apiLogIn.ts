import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import createApiRoot from './apiRoot';
import apiRoot from '../signup/apiRoot';

function checkData(userData: CustomerSignin) {
  return apiRoot.me().login().post({ body: userData }).execute();
}

function signIn(userData: CustomerSignin) {
  const apiPasswordRoot = createApiRoot(userData.email, userData.password);
  return apiPasswordRoot.me().login().post({ body: userData }).execute();
}

export { signIn, checkData };
