import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { apiDataUser } from './apiData';
import { IRegistrationForm } from '../../types/types';

const projectKey = apiDataUser.PROJECT_KEY;
const scopes = [apiDataUser.SCOPES];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: apiDataUser.AUTH_URL,
  projectKey: apiDataUser.PROJECT_KEY,
  credentials: {
    clientId: apiDataUser.CLIENT_ID,
    clientSecret: apiDataUser.CLIENT_SECRET,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiDataUser.API_URL,
  fetch,
};

const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: apiDataUser.PROJECT_KEY,
});

const signUp = (data: IRegistrationForm) => {
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
