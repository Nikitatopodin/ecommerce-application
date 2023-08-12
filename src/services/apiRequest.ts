import { type MyCustomerDraft } from '@commercetools/platform-sdk';
import apiRoot from './apiRoot';

const signUp = (data: MyCustomerDraft) => {
  return apiRoot
    .me()
    .signup()
    .post({
      body: data,
    })
    .execute();
};

const logIn = (email: string, password: string) => {
  return apiRoot
    .me()
    .login()
    .post({
      body: { email, password },
    })
    .execute();
};

export { signUp, logIn };
