import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

import { AccountLoginForm } from '../../components/AccountLoginForm';
import { LoadingErrorOrRenderQuery } from '../../components/LoadingErrorOrRenderQuery';
import { LoadingErrorOrRender } from '../../components/LoadingErrorOrRender';
import { AccountDetails } from '../../components/AccountDetails';
import { Modal } from '../../components/Modal';
import {
  NavButton,
  BackButton,
  NavButtonPositions,
} from '../../components/NavButton';
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
  const { data, error, loading, refetch } = useGetAccountFromSessionQuery({
    fetchPolicy: 'network-only',
  });
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
                <AccountLoginForm
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
      <BackButton
        position={NavButtonPositions.BottomLeft}
        onClick={() => router.push('/')}
      />
    </>
  );
};

export default withApollo(Login);
