import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { type MyCustomerDraft } from '@commercetools/platform-sdk';
import createApiRoot from './flows/password';
import createExistingApiRoot from './flows/existing';
import createAnonymousApiRoot from './flows/anonymous';

const signIn = (userData: CustomerSignin) => {
  const apiPasswordRoot = createApiRoot(userData.email, userData.password);
  localStorage.removeItem('token');
  return apiPasswordRoot.me().login().post({ body: userData }).execute();
};

const signUp = (data: MyCustomerDraft) => {
  const anonymousApiRoot = createAnonymousApiRoot();
  return anonymousApiRoot.me().signup().post({ body: data }).execute();
};

const getProfile = () => {
  const apiRoot = createExistingApiRoot();
  return apiRoot.me().get().execute();
};

const getProducts = () => {
  let apiRoot;
  if (localStorage.getItem('token')) {
    apiRoot = createExistingApiRoot();
  } else {
    apiRoot = createAnonymousApiRoot();
  }
  return apiRoot.productProjections().get().execute();
};

const getProductById = (id: string) => {
  const apiRoot = createExistingApiRoot();
  return apiRoot.productProjections().withId({ ID: id }).get().execute();
};

const getCategories = () => {
  let apiRoot;
  if (localStorage.getItem('token')) {
    apiRoot = createExistingApiRoot();
  } else {
    apiRoot = createAnonymousApiRoot();
  }
  return apiRoot.categories().get().execute();
};

export {
  signIn,
  signUp,
  getProducts,
  getProfile,
  getProductById,
  getCategories,
};
