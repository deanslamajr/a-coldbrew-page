import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

import { AccountCreateFinishModal } from '../../components/AccountCreateFinishModal';

import { redirect } from '../../helpers/nextLifeCycle';

import { withApollo } from '../../graphql-client/with-apollo';

const { publicRuntimeConfig } = getConfig();

interface CreatePageProps {
  token: string;
}

const CreatePage: NextPage<CreatePageProps> = ({ token }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>
          {publicRuntimeConfig.APP_TITLE} - finish creating new account
        </title>
      </Head>
      <AccountCreateFinishModal
        handleBackClick={() => router.push('/a/login')}
        token={token}
      />
    </>
  );
};

CreatePage.getInitialProps = async props => {
  let accountCreateToken = props.query?.t;

  if (!accountCreateToken) {
    redirect('/a/new', props.res);
    return { token: '' };
  }

  if (Array.isArray(accountCreateToken)) {
    accountCreateToken = accountCreateToken[0];
  }

  return { token: accountCreateToken };
};

export default withApollo(CreatePage);
