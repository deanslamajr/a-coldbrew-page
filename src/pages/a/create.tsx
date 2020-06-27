import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import getConfig from 'next/config';

import { redirect } from '../../helpers/nextLifeCycle';
import { withApollo, WithApolloPageContext } from '../../graphql/with-apollo';

import {
  RedeemAccountCreateTokenDocument,
  RedeemAccountCreateTokenMutation,
} from '../../graphql/mutations/redeemAccountCreateToken.graphql';

const { publicRuntimeConfig } = getConfig();

interface CreatePageProps {}

const CreatePage: NextPage<CreatePageProps> = ({}) => {
  return (
    <>
      <Head>
        <title>
          {publicRuntimeConfig.APP_TITLE} - finish creating new account
        </title>
      </Head>
    </>
  );
};

CreatePage.getInitialProps = async props => {
  let hasValidToken = false;
  let accountCreateToken = props.query?.t;
  const apolloClient = (props as WithApolloPageContext).apolloClient;

  if (accountCreateToken) {
    if (Array.isArray(accountCreateToken)) {
      accountCreateToken = accountCreateToken[0];
    }

    const { data } = await apolloClient.mutate<
      RedeemAccountCreateTokenMutation
    >({
      mutation: RedeemAccountCreateTokenDocument,
      variables: {
        input: {
          token: accountCreateToken,
        },
      },
    });

    if (data) {
      hasValidToken = data.redeemAccountCreateToken.wasTokenValid;
    }
  }

  if (!hasValidToken) {
    redirect('/a/new', props.res);
    return {};
  }

  return {};
};

export default withApollo(CreatePage);
