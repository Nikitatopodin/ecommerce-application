import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { apiDataUser } from './apiData';

export enum ResponseCodes {
  loginError = 'InvalidCredentials',
}

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

export default apiRoot;
