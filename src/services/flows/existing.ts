import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  ExistingTokenMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import apiDataUser from './apiData';

export enum ResponseCodes {
  loginError = 'InvalidCredentials',
}

function createExistingApiRoot() {
  const projectKey = apiDataUser.PROJECT_KEY;

  const options: ExistingTokenMiddlewareOptions = {
    force: true,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiDataUser.API_URL,
    fetch,
  };
  const authorizationToken: string = `Bearer ${
    JSON.parse(localStorage.getItem('token')!).token
  }`;

  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withExistingTokenFlow(authorizationToken, options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: apiDataUser.PROJECT_KEY,
  });
}

export default createExistingApiRoot;
