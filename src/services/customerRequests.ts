import {
  Customer,
  CustomerSignin,
  MyCustomerChangePassword,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import {
  BaseAddress,
  ClientResponse,
  MyCartUpdate,
  type MyCustomerDraft,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import dayjs from 'dayjs';
import createApiRoot from './flows/password';
import createExistingApiRoot from './flows/existing';
import createAnonymousApiRoot from './flows/anonymous';
import { IProductQueryArgs } from '../types/types';

const signUp = (data: MyCustomerDraft) => {
  const anonymousApiRoot = createAnonymousApiRoot();
  return anonymousApiRoot.me().signup().post({ body: data }).execute();
};

const signIn = (userData: CustomerSignin) => {
  const apiPasswordRoot = createApiRoot(userData.email, userData.password);
  localStorage.removeItem('token');
  return apiPasswordRoot.me().login().post({ body: userData }).execute();
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
        action: 'changeEmail',
        email: values.email,
      },
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

const updatePassword = (
  currentPassword: string,
  newPassword: string,
  version: number,
) => {
  const apiRoot = createExistingApiRoot();
  const body: MyCustomerChangePassword = {
    version,
    currentPassword,
    newPassword,
  };
  return apiRoot.me().password().post({ body }).execute();
};

const addNewAddress = (address: BaseAddress, version: number) => {
  const apiRoot = createExistingApiRoot();
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: 'addAddress',
        address,
      },
    ],
  };
  return apiRoot.me().post({ body }).execute();
};

const addAddressId = (
  addressId: string,
  version: number,
  isBilling: boolean,
) => {
  const apiRoot = createExistingApiRoot();
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: isBilling ? 'addBillingAddressId' : 'addShippingAddressId',
        addressId,
      },
    ],
  };
  return apiRoot.me().post({ body }).execute();
};

const addDefaultAddress = (
  addressId: string,
  version: number,
  isBilling: boolean,
) => {
  const apiRoot = createExistingApiRoot();
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: isBilling
          ? 'setDefaultBillingAddress'
          : 'setDefaultShippingAddress',
        addressId,
      },
    ],
  };
  return apiRoot.me().post({ body }).execute();
};

const updateAddress = (values: BaseAddress, version: number) => {
  const apiRoot = createExistingApiRoot();
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: 'changeAddress',
        addressId: values.id,
        address: values,
      },
    ],
  };
  return apiRoot.me().post({ body }).execute();
};

const removeAddress = (addressId: string, version: number) => {
  const apiRoot = createExistingApiRoot();
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: 'removeAddress',
        addressId,
      },
    ],
  };
  return apiRoot.me().post({ body }).execute();
};

const getProducts = (queryArgs?: IProductQueryArgs) => {
  let apiRoot;
  if (localStorage.getItem('token')) {
    apiRoot = createExistingApiRoot();
  } else {
    apiRoot = createAnonymousApiRoot();
  }
  return apiRoot.productProjections().search().get({ queryArgs }).execute();
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

const getCart = () => {
  const apiRoot = createExistingApiRoot();
  return apiRoot.me().activeCart().get().execute();
};

const createCart = (currency: string) => {
  const apiRoot = createExistingApiRoot();
  const body = {
    currency,
  };
  return apiRoot.me().carts().post({ body }).execute();
};

const addCartItem = (
  version: number,
  productId: string,
  variantId: number,
  quantity: number,
  cartId: string,
) => {
  const apiRoot = createExistingApiRoot();
  const body: MyCartUpdate = {
    version,
    actions: [
      {
        action: 'addLineItem',
        productId,
        variantId,
        quantity,
      },
    ],
  };
  return apiRoot.me().carts().withId({ ID: cartId }).post({ body }).execute();
};

const removeCartItem = (
  version: number,
  cartId: string,
  lineItemId: string,
  currencyCode: string,
  centAmount: number,
  quantity?: number,
) => {
  const apiRoot = createExistingApiRoot();
  const body: MyCartUpdate = {
    version,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId,
        quantity,
        externalPrice: {
          currencyCode,
          centAmount,
        },
      },
    ],
  };
  return apiRoot.me().carts().withId({ ID: cartId }).post({ body }).execute();
};

const changeProductQuantity = (
  version: number,
  lineItemId: string,
  cartId: string,
  quantity: number,
) => {
  const apiRoot = createExistingApiRoot();

  const body: MyCartUpdate = {
    version,
    actions: [
      {
        action: 'changeLineItemQuantity',
        lineItemId,
        quantity,
      },
    ],
  };
  return apiRoot.me().carts().withId({ ID: cartId }).post({ body }).execute();
};

export {
  signIn,
  signUp,
  getProfile,
  updateProfile,
  updatePassword,
  addNewAddress,
  addAddressId,
  addDefaultAddress,
  updateAddress,
  removeAddress,
  getProducts,
  getProductById,
  getCategories,
  getCart,
  createCart,
  addCartItem,
  removeCartItem,
  changeProductQuantity,
};
