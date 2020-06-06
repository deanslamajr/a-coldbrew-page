import App from 'next/app';
import Head from 'next/head';
import getConfig from 'next/config';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { load, ReCaptchaInstance } from 'recaptcha-v3';

import { GlobalStyles } from '../components/layouts';

import { cssTheme } from '../helpers/constants';

const { publicRuntimeConfig } = getConfig();

interface AppStateInterface {
  recaptchaV3Instance: ReCaptchaInstance | null;
}

export default class MyApp extends App<{}, {}, AppStateInterface> {
  state = {
    recaptchaV3Instance: null,
  };

  componentDidMount() {
    if (publicRuntimeConfig.RECAPTCHA_V3_SITE) {
      load(publicRuntimeConfig.RECAPTCHA_V3_SITE, {
        autoHideBadge: true,
      }).then(recaptchaV3Instance => {
        this.setState({
          recaptchaV3Instance,
        });
      });
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <ThemeProvider theme={cssTheme}>
          <GlobalStyles />
          <Component
            {...pageProps}
            recaptchaV3Instance={this.state.recaptchaV3Instance}
          />
        </ThemeProvider>
      </>
    );
  }
}
