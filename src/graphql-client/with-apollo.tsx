import { NextPage, NextPageContext } from 'next';
import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { createApolloClient as createApolloClientForBrowser } from './createApolloClient/browser';
import { ContextInterface } from '../graphql-server/context';

type TApolloClient = ApolloClient<NormalizedCacheObject>;

type InitialProps = {
  apolloClient: TApolloClient;
  apolloState: any;
} & Record<string, any>;

export type WithApolloPageContext = {
  apolloClient: TApolloClient;
} & NextPageContext;

let globalApolloClient: TApolloClient;

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 */
export function withApollo<T>(PageComponent: NextPage<T>, { ssr = true } = {}) {
  const WithApollo = ({
    apolloClient,
    apolloState,
    ...pageProps
  }: InitialProps) => {
    const client =
      apolloClient || initApolloClient({ initialState: apolloState });
    return (
      <ApolloProvider client={client}>
        <PageComponent {...(pageProps as T)} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: WithApolloPageContext) => {
      const { AppTree } = ctx;

      let resolvedContext: ContextInterface | undefined;
      if (ssr && ctx.req && ctx.res) {
        const resolveContext = await (await import('../graphql-server/context'))
          .resolveContextDuringNextSSR;
        resolvedContext = await resolveContext({
          req: ctx.req,
          res: ctx.res,
        });
      }

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient({
        resolvedContext,
      }));

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };
  }

  return WithApollo;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
function initApolloClient({
  resolvedContext,
  initialState,
}: {
  initialState?: any;
  resolvedContext?: ContextInterface;
}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    const createApolloClientForSSR = require('./createApolloClient/ssr')
      .createApolloClient;
    return createApolloClientForSSR({ resolvedContext, initialState });
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClientForBrowser(initialState);
  }

  return globalApolloClient;
}
