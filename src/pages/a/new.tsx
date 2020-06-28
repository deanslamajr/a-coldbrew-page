import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

import { AccountCreateModal } from '../../components/AccountCreateModal';

import { withApollo } from '../../graphql-client/with-apollo';

const { publicRuntimeConfig } = getConfig();

const NewPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{publicRuntimeConfig.APP_TITLE} - new</title>
      </Head>
      <AccountCreateModal handleBackClick={() => router.push('/a/login')} />
    </>
  );
};

export default withApollo(NewPage);
