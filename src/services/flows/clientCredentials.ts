import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  AuthMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import apiDataUser from './apiData';

export enum ResponseCodes {
  loginError = 'InvalidCredentials',
}

const projectKey = apiDataUser.PROJECT_KEY;
const scopes = [apiDataUser.SCOPES];

const options: AuthMiddlewareOptions = {
  host: apiDataUser.AUTH_URL,
  projectKey: apiDataUser.PROJECT_KEY,
  credentials: {
    clientId: apiDataUser.CLIENT_ID,
    clientSecret: apiDataUser.CLIENT_SECRET,
  },
  tokenCache: {
    get() {
      return JSON.parse(localStorage.getItem('token')!) as TokenStore;
    },
    set(cache) {
      localStorage.setItem('token', JSON.stringify(cache));
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
  .withClientCredentialsFlow(options)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const apiClienCredentialsRoot = createApiBuilderFromCtpClient(
  ctpClient,
).withProjectKey({
  projectKey: apiDataUser.PROJECT_KEY,
});

export default apiClienCredentialsRoot;
