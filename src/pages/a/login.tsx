import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

import { AccountLoginModal } from '../../components/AccountLoginModal';

import { withApollo } from '../../graphql/with-apollo';

const { publicRuntimeConfig } = getConfig();

const Login: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{publicRuntimeConfig.APP_TITLE}</title>
      </Head>
      <AccountLoginModal handleBackClick={() => router.push('/')} />
    </>
  );
};

export default withApollo(Login);
