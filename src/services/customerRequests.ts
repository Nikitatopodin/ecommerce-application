import {
  Customer,
  CustomerSignin,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import {
  BaseAddress,
  ClientResponse,
  type MyCustomerDraft,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import dayjs from 'dayjs';
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

const updateProfile = (values: Customer, version: number) => {
  const apiRoot = createExistingApiRoot();
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: 'setFirstName',
        firstName: values.firstName,
      },
      {
        action: 'setLastName',
        lastName: values.lastName,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: dayjs(values.dateOfBirth).format('YYYY-MM-DD'),
      },
    ],
  };
  return apiRoot.me().post({ body }).execute();
};

const updateAddresses = (values: BaseAddress[], version: number) => {
  const apiRoot = createExistingApiRoot();
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: 'changeAddress',
        addressId: values[0].id,
        address: values[0],
      },
      {
        action: 'changeAddress',
        addressId: values[1].id,
        address: values[1],
      },
    ],
  };
  return apiRoot.me().post({ body }).execute();
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

export {
  signIn,
  signUp,
  getProducts,
  getProfile,
  updateProfile,
  updateAddresses,
};
