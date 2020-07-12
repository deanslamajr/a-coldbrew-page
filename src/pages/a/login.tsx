import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { IoMdArrowBack } from 'react-icons/io';

import { AccountLoginModal } from '../../components/AccountLoginModal';
import { LoadingErrorOrRenderQuery } from '../../components/LoadingErrorOrRenderQuery';
import { LoadingErrorOrRender } from '../../components/LoadingErrorOrRender';
import { AccountDetails } from '../../components/AccountDetails';
import { Modal } from '../../components/Modal';
import { NavButton, NavButtonPositions } from '../../components/NavButton';
import { SuccessIconThenAction } from '../../components/SuccessIconThenAction';

import { cssTheme } from '../../helpers/constants';

import { withApollo } from '../../graphql-client/with-apollo';
import {
  useGetAccountFromSessionQuery,
  GetAccountFromSessionQuery,
} from '../../graphql-client/queries/getAccountFromSession.graphql';
import { useLoginAccountMutation } from '../../graphql-client/mutations/loginAccount.graphql';

const { publicRuntimeConfig } = getConfig();

export interface LoginFormFields {
  email: string;
  password: string;
}

const initialValues: LoginFormFields = {
  email: '',
  password: '',
};

const Login: NextPage = () => {
  const router = useRouter();
  const { data, error, loading, refetch } = useGetAccountFromSessionQuery();
  const [
    loginAccount,
    { called, data: loginData, error: loginError, loading: isLoginLoading },
  ] = useLoginAccountMutation();
  const [initialFormState, setInitialFormState] = useState<LoginFormFields>(
    initialValues
  );
  const [formIsReset, setFormIsReset] = useState(true);

  const login = async ({ email, password }: LoginFormFields) => {
    setInitialFormState({ email, password });
    await loginAccount({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
    setFormIsReset(false);
  };

  const isSuccess = () => {
    if (formIsReset) {
      return;
    }
    return loginData?.loginAccount.wasLoginSuccess || undefined;
  };

  return (
    <>
      <Head>
        <title>{publicRuntimeConfig.APP_TITLE} - login</title>
      </Head>
      <Modal>
        <LoadingErrorOrRenderQuery<GetAccountFromSessionQuery>
          error={error}
          isLoading={loading}
          queryResult={data}
          render={({ queryResult }) => {
            const loggedInAccountEmail =
              queryResult.getAccountFromSession.email;

            return loggedInAccountEmail ? (
              <AccountDetails
                loggedInAccountEmail={loggedInAccountEmail}
                onLogout={() => {
                  setFormIsReset(true);
                  return refetch();
                }}
              />
            ) : (
              <LoadingErrorOrRender
                error={loginError}
                isLoading={isLoginLoading}
                isSuccess={isSuccess()}
                renderOnSuccess={
                  <SuccessIconThenAction delayedCallback={() => refetch()} />
                }>
                <AccountLoginModal
                  initialValues={initialFormState}
                  isFailedLogin={
                    called &&
                    Boolean(
                      loginData && !loginData.loginAccount.wasLoginSuccess
                    )
                  }
                  onLogin={login}
                />
              </LoadingErrorOrRender>
            );
          }}
        />
      </Modal>
      <NavButton
        position={NavButtonPositions.BottomLeft}
        clickHandler={() => router.push('/')}
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

export default withApollo(Login);
