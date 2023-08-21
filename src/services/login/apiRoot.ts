import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import apiDataUser from '../apiData';

export enum ResponseCodes {
  loginError = 'InvalidCredentials',
}

function createApiRoot(email: string, password: string) {
  const projectKey = apiDataUser.PROJECT_KEY;
  const scopes = [apiDataUser.SCOPES];

  const options: PasswordAuthMiddlewareOptions = {
    host: apiDataUser.AUTH_URL,
    projectKey: apiDataUser.PROJECT_KEY,
    credentials: {
      clientId: apiDataUser.CLIENT_ID,
      clientSecret: apiDataUser.CLIENT_SECRET,
      user: {
        username: email,
        password,
      },
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
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: apiDataUser.PROJECT_KEY,
  });
}

export default createApiRoot;
