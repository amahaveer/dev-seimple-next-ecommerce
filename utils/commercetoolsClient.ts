import { ClientBuilder } from "@commercetools/ts-client";

const authMiddlewareOptions = {
    credentials: {
      clientId: 'uoGmvsXhpsAAxV5MGdDnYWJD',
      clientSecret: 'YY0mIWec89GvXScZWhF-TFoUdqYUamtn',
    },
    host: 'https://auth.us-central1.gcp.commercetools.com',
    projectKey: 'dev-commerce',
  }
  
  const httpMiddlewareOptions = {
    host: 'https://api.us-central1.gcp.commercetools.com',
    httpClient: fetch,
  }
  
  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withConcurrentModificationMiddleware()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .build();

export default client;
