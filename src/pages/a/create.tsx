import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { FiCheckCircle } from 'react-icons/fi';
import { IoMdArrowBack } from 'react-icons/io';

import { AccountCreateFinishModal } from '../../components/AccountCreateFinishModal';
import { Modal } from '../../components/Modal';
import { LoadingErrorOrRender } from '../../components/LoadingErrorOrRender';
import { NavButton, NavButtonPositions } from '../../components/NavButton';

import { redirect } from '../../helpers/nextLifeCycle';
import { cssTheme } from '../../helpers/constants';

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
          data={data}
          renderOnSuccess={
            <FiCheckCircle
              color={cssTheme.colors.green}
              size={cssTheme.sizes.errorIcon}
            />
          }>
          <AccountCreateFinishModal
            finishAccountCreation={finishAccountCreation}
          />
        </LoadingErrorOrRender>
      </Modal>
      <NavButton
        position={NavButtonPositions.BottomLeft}
        clickHandler={() => router.push('/a/login')}
        icon={
          <IoMdArrowBack
            color={cssTheme.colors.red}
            size={cssTheme.sizes.navbarButtonIconSize}
          />
        }
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
