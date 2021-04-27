import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { Home as HomeCore } from '../../components/Home';

import { withApollo } from '../../graphql-client/with-apollo';

const { publicRuntimeConfig } = getConfig();

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{publicRuntimeConfig.APP_TITLE}</title>
      </Head>
      <HomeCore onNavigateToAccountPage={() => router.push('/a/login')} />
    </>
  );
};

export default withApollo(Home);
