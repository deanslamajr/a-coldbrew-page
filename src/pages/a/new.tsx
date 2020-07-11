import React, { useContext, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { IoMdArrowBack } from 'react-icons/io';
import RecaptchaV2 from 'react-google-recaptcha';

import {
  AccountCreateForm,
  AccountCreateFormFields,
} from '../../components/AccountCreateForm';
import { Modal } from '../../components/Modal';
import { LoadingErrorOrRender } from '../../components/LoadingErrorOrRender';
import { NavButton, NavButtonPositions } from '../../components/NavButton';
import { SuccessIconThenAction } from '../../components/SuccessIconThenAction';

import { withApollo } from '../../graphql-client/with-apollo';
import { useSendAccountCreateEmailMutation } from '../../graphql-client/mutations/sendAccountCreateEmail.graphql';

import { RecaptchaV3Context } from '../../contexts/RecaptchaV3Context';

import {
  cssTheme,
  RECAPTCHA_ACTION_CREATE_ACCOUNT,
} from '../../helpers/constants';

const { publicRuntimeConfig } = getConfig();

const initialValues: AccountCreateFormFields = {
  email: '',
  verifyEmail: '',
};

const NewPage: NextPage = () => {
  const router = useRouter();
  const recaptchaV3Instance = useContext(RecaptchaV3Context);
  const [
    sendAccountCreateEmail,
    { error, data, loading },
  ] = useSendAccountCreateEmailMutation();
  const [initialFormState, setInitialFormState] = useState<
    AccountCreateFormFields
  >(initialValues);

  const checkRecaptchaV3Status = (): Promise<string> => {
    if (!publicRuntimeConfig.RECAPTCHA_V3_SITE) {
      return Promise.resolve('');
    }

    if (!recaptchaV3Instance) {
      return Promise.reject('recaptcha instance does not exist!');
    }

    return recaptchaV3Instance.execute(RECAPTCHA_ACTION_CREATE_ACCOUNT);
  };

  const captureRecaptchaAndSendEmail = async (email: string): Promise<any> => {
    setInitialFormState({ email, verifyEmail: '' });

    const recaptchaV3Token = await checkRecaptchaV3Status();

    sendAccountCreateEmail({
      variables: {
        input: {
          email,
          recaptchaV3Token,
        },
      },
    });
  };

  const handleRecaptchaComplete = (recaptchaV2Token: string | null) => {
    if (recaptchaV2Token) {
      sendAccountCreateEmail({
        variables: {
          input: {
            email: initialFormState.email,
            recaptchaV2Token,
          },
        },
      });
    }
  };

  const renderOnFailure =
    data?.sendAccountCreateEmail.recaptchaPassed === false ? (
      <RecaptchaV2
        sitekey={publicRuntimeConfig.RECAPTCHA_V2_SITE}
        onChange={handleRecaptchaComplete}
      />
    ) : null;

  return (
    <>
      <Head>
        <title>{publicRuntimeConfig.APP_TITLE} - new</title>
      </Head>
      <Modal>
        <LoadingErrorOrRender
          error={error}
          isLoading={loading}
          isSuccess={data?.sendAccountCreateEmail.emailSendSuccess}
          renderOnSuccess={
            <SuccessIconThenAction
              delayedCallback={() => router.push('/a/login')}
            />
          }
          renderOnFailure={renderOnFailure}>
          <AccountCreateForm
            captureRecaptchaAndSendEmail={captureRecaptchaAndSendEmail}
            initialValues={initialFormState}
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

export default withApollo(NewPage);
