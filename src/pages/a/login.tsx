import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

import { AccountLoginModal } from '../../components/AccountLoginModal';
import { LoadingErrorOrRenderQuery } from '../../components/LoadingErrorOrRenderQuery';

import { withApollo } from '../../graphql-client/with-apollo';

import {
  useGetAccountFromSessionQuery,
  GetAccountFromSessionQuery,
} from '../../graphql-client/queries/getAccountFromSession.graphql';
import { useLogoutAccountMutation } from '../../graphql-client/mutations/logoutAccount.graphql';

const { publicRuntimeConfig } = getConfig();

const Login: NextPage = () => {
  const router = useRouter();
  const { data, error, loading } = useGetAccountFromSessionQuery();
  const [logoutAccount, result] = useLogoutAccountMutation();

  return (
    <>
      <Head>
        <title>{publicRuntimeConfig.APP_TITLE} - login</title>
      </Head>
      <LoadingErrorOrRenderQuery<GetAccountFromSessionQuery>
        error={error}
        isLoading={loading}
        queryResult={data}
        render={({ queryResult }) => {
          const loggedInAccountEmail = queryResult.getAccountFromSession.email;

          return loggedInAccountEmail ? (
            <>
              <div>Logged in as:{loggedInAccountEmail}</div>
              <button onClick={() => logoutAccount()}>Logout</button>
            </>
          ) : (
            <AccountLoginModal handleBackClick={() => router.push('/')} />
          );
        }}
      />
    </>
  );
};

export default withApollo(Login);
