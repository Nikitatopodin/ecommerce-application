import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import apiRoot from './apiRoot';

function loginUser(userData: CustomerSignin) {
  return apiRoot
    .me()
    .login()
    .post({ body: userData })
    .execute()
    .then(({ body }) => {
      console.log('success', JSON.stringify(body));
    })
    .catch((error) => error);
}

export default loginUser;
