import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const projectKey = 'final-task';
const scopes = [
  'create_anonymous_token:final-task view_categories:final-task manage_my_quotes:final-task manage_my_shopping_lists:final-task manage_my_payments:final-task manage_my_orders:final-task view_published_products:final-task manage_my_business_units:final-task manage_my_profile:final-task manage_my_quote_requests:final-task',
];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: '4D4iKyvOlnS3VWSRAWPUYrSI',
    clientSecret: 'XaRpwXIzp6tFMteCqTxvAF5Z5VXBiif3',
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export default ctpClient;
