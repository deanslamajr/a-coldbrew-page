import Head from 'next/head';
import { NextPage } from 'next';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const ErrorComponent: NextPage = () => (
  <>
    <Head>
      <title>{publicRuntimeConfig.APP_TITLE} - page not found</title>
    </Head>
    Page not found
  </>
);

export default ErrorComponent;
