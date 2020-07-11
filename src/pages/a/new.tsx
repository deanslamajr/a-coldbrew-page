import React, { useContext } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { FiCheckCircle } from 'react-icons/fi';
import { IoMdArrowBack } from 'react-icons/io';

import { AccountCreateForm } from '../../components/AccountCreateForm';
import { Modal } from '../../components/Modal';
import { LoadingErrorOrRender } from '../../components/LoadingErrorOrRender';
import { NavButton, NavButtonPositions } from '../../components/NavButton';

import { withApollo } from '../../graphql-client/with-apollo';
import { useSendAccountCreateEmailMutation } from '../../graphql-client/mutations/sendAccountCreateEmail.graphql';

import { RecaptchaV3Context } from '../../contexts/RecaptchaV3Context';

import {
  cssTheme,
  RECAPTCHA_ACTION_CREATE_ACCOUNT,
} from '../../helpers/constants';

const { publicRuntimeConfig } = getConfig();

const NewPage: NextPage = () => {
  const router = useRouter();
  const recaptchaV3Instance = useContext(RecaptchaV3Context);
  const [
    sendAccountCreateEmail,
    { error, data, loading },
  ] = useSendAccountCreateEmailMutation();

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
    const recaptchaV3Token = await checkRecaptchaV3Status();

    sendAccountCreateEmail({
      variables: {
        input: {
          email,
          recaptchaV3Response: recaptchaV3Token,
        },
      },
    });
  };

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
            <FiCheckCircle
              color={cssTheme.colors.green}
              size={cssTheme.sizes.errorIcon}
            />
          }>
          <AccountCreateForm
            captureRecaptchaAndSendEmail={captureRecaptchaAndSendEmail}
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
