import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

import { AccountCreateFinishForm } from '../../components/AccountCreateFinishForm';
import { Modal } from '../../components/Modal';
import { LoadingErrorOrRender } from '../../components/LoadingErrorOrRender';
import { BackButton, NavButtonPositions } from '../../components/NavButton';
import { SuccessIconThenAction } from '../../components/SuccessIconThenAction';

import { redirect } from '../../helpers/nextLifeCycle';

import { withApollo } from '../../graphql-client/with-apollo';
import { useFinishAccountCreateMutation } from '../../graphql-client/mutations/finishAccountCreate.graphql';

const { publicRuntimeConfig } = getConfig();

interface CreatePageProps {
  token: string;
}

const CreatePage: NextPage<CreatePageProps> = ({ token }) => {
  const router = useRouter();
  const [
    finishAccountCreate,
    { data, error, loading },
  ] = useFinishAccountCreateMutation();

  const finishAccountCreation = async (password: string): Promise<any> => {
    return finishAccountCreate({
      variables: {
        input: {
          token,
          password,
        },
      },
    });
  };
  return (
    <>
      <Head>
        <title>
          {publicRuntimeConfig.APP_TITLE} - finish creating new account
        </title>
      </Head>
      <Modal>
        <LoadingErrorOrRender
          error={error}
          isLoading={loading}
          isSuccess={data?.finishAccountCreate.accountCreateSuccess}
          renderOnSuccess={
            <SuccessIconThenAction delayedCallback={() => router.push('/')} />
          }>
          <AccountCreateFinishForm
            finishAccountCreation={finishAccountCreation}
          />
        </LoadingErrorOrRender>
      </Modal>
      <BackButton
        position={NavButtonPositions.BottomLeft}
        onClick={() => router.push('/a/login')}
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
