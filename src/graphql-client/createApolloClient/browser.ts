import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
export function createApolloClient(initialState = {}) {
  const cache = new InMemoryCache().restore(initialState);

  return new ApolloClient({
    link: createHttpLink(),
    cache,
  });
}

function createHttpLink() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { HttpLink } = require('apollo-link-http');
  return new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
  });
}
