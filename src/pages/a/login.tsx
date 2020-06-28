import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

import { AccountLoginModal } from '../../components/AccountLoginModal';
import { LoadingErrorOrRender } from '../../components/LoadingErrorOrRender';

import { withApollo } from '../../graphql-client/with-apollo';

import {
  useGetAccountFromSessionQuery,
  GetAccountFromSessionQuery,
} from '../../graphql-client/queries/getAccountFromSession.graphql';

const { publicRuntimeConfig } = getConfig();

const Login: NextPage = () => {
  const router = useRouter();
  const { data, error, loading } = useGetAccountFromSessionQuery();

  return (
    <>
      <Head>
        <title>{publicRuntimeConfig.APP_TITLE} - login</title>
      </Head>
      <LoadingErrorOrRender<GetAccountFromSessionQuery>
        error={error}
        isLoading={loading}
        queryResult={data}
        render={({ queryResult }) => {
          const loggedInAccountEmail = queryResult.getAccountFromSession.email;

          return loggedInAccountEmail ? (
            <div>Logged in as:{loggedInAccountEmail}</div>
          ) : (
            <AccountLoginModal handleBackClick={() => router.push('/')} />
          );
        }}
      />
    </>
  );
};

export default withApollo(Login);
