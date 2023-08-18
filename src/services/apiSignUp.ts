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

export default signUp;
