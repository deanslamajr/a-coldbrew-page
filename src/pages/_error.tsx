import { NextPage } from 'next';
import Head from 'next/head';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const Error: NextPage = () => (
  <>
    <Head>
      <title>{publicRuntimeConfig.APP_TITLE} - page error</title>
    </Head>
    There was an error while processing this page request.
  </>
);

export default Error;
