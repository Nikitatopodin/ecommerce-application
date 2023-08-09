import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import ctpClient from './BuildClient';

function loginUser(userData: CustomerSignin) {
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: 'final-task',
  });

  apiRoot
    .me()
    .login()
    .post({ body: userData })
    .execute()
    .then(({ body }) => {
      console.log('success', JSON.stringify(body));
    })
    .catch(console.error);
}

export default loginUser;
