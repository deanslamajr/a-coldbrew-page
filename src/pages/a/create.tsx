import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import getConfig from 'next/config';

import { withApollo, WithApolloPageContext } from '../../graphql/with-apollo';

import { RedeemAccountCreateTokenDocument } from '../../graphql/mutations/redeemAccountCreateToken.graphql';

const { publicRuntimeConfig } = getConfig();

interface CreatePageProps {
  hasValidToken: boolean;
}

const CreatePage: NextPage<CreatePageProps> = ({ hasValidToken }) => {
  return (
    <>
      <Head>
        <title>
          {publicRuntimeConfig.APP_TITLE} - finish creating new account
        </title>
      </Head>
      {hasValidToken ? (
        <div>TOKEN IS VALID!!!!!!!!</div>
      ) : (
        <div>Invalid token: Please try again</div>
      )}
    </>
  );
};

CreatePage.getInitialProps = async props => {
  const hasValidToken = false;
  const accountCreateToken = props.query?.t;
  const apolloClient = (props as WithApolloPageContext).apolloClient;
  console.log('accountCreateToken:', accountCreateToken);
  // console.log('apolloClient:', apolloClient);

  if (!accountCreateToken) {
    return { hasValidToken };
  }

  const response = await apolloClient.mutate({
    mutation: RedeemAccountCreateTokenDocument,
    variables: {
      input: {
        token: accountCreateToken,
      },
    },
  });

  console.log('response', response);

  return { hasValidToken };
};

export default withApollo(CreatePage);
