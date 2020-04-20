import { NextPage } from 'next';
import Head from 'next/head';
import getConfig from 'next/config';

import { withApollo } from '../graphql/with-apollo';

const { publicRuntimeConfig } = getConfig();
import { useFetchHomeQuery } from '../graphql/queries/fetchHome.graphql';

const Home: NextPage = () => {
  const { data, loading, error } = useFetchHomeQuery();

  console.log({ data, loading, error });

  return (
    <>
      <Head>
        <title>{publicRuntimeConfig.APP_TITLE}</title>
      </Head>
      Hello World
    </>
  );
};

export default withApollo(Home);
