import {
  Customer,
  CustomerSignin,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import {
  ClientResponse,
  type MyCustomerDraft,
} from '@commercetools/platform-sdk';
import createApiRoot from './flows/password';
import anonymousApiRoot from './flows/anonymous';
import createExistingApiRoot from './flows/existing';

const signIn = (userData: CustomerSignin) => {
  const apiPasswordRoot = createApiRoot(userData.email, userData.password);
  return apiPasswordRoot.me().login().post({ body: userData }).execute();
};

const signUp = (data: MyCustomerDraft) => {
  return anonymousApiRoot.me().signup().post({ body: data }).execute();
};

const getProfile = (): Promise<ClientResponse<Customer>> => {
  const apiRoot = createExistingApiRoot();
  return apiRoot.me().get().execute();
};

const getProducts = () => {
  let apiRoot;
  if (localStorage.getItem('token')) {
    apiRoot = createExistingApiRoot();
  } else {
    apiRoot = anonymousApiRoot;
  }
  return apiRoot.productProjections().get().execute();
};

export { signIn, signUp, getProducts, getProfile };
