import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ContextInterface } from '../../graphql-server/context';

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
export function createApolloClient({
  resolvedContext,
  initialState = {},
}: {
  initialState?: any;
  resolvedContext?: ContextInterface;
}) {
  const cache = new InMemoryCache().restore(initialState);

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: true,
    link: createIsomorphLink(resolvedContext),
    cache,
    ssrForceFetchDelay: 100,
  });
}

function createIsomorphLink(resolvedContext?: ContextInterface) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { SchemaLink } = require('apollo-link-schema');
  const schema = require('../../graphql-server/schema').default;
  return new SchemaLink({ context: resolvedContext, schema });
}
