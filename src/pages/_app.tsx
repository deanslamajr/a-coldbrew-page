import App from 'next/app';
import Head from 'next/head';
import getConfig from 'next/config';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { load } from 'recaptcha-v3';

import { GlobalStyles } from '../components/layouts';

import {
  RecaptchaV3Context,
  RecaptchaV3Instance,
} from '../contexts/RecaptchaV3Context';
import { ChoresProvider } from '../contexts/ChoresContext';

import { cssTheme } from '../helpers/constants';

const { publicRuntimeConfig } = getConfig();

interface AppStateInterface {
  recaptchaV3Instance: RecaptchaV3Instance;
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
          <RecaptchaV3Context.Provider value={this.state.recaptchaV3Instance}>
            <ChoresProvider>
              <Component {...pageProps} />
            </ChoresProvider>
          </RecaptchaV3Context.Provider>
        </ThemeProvider>
      </>
    );
  }
}

// TODO: Possible improvement to avoid rerendering the whole app whenever a context value changes
//
// function AppAfter() {
//   return (
//     <AppWrapper>
//       <SomeForm />
//       <hr />
//       <SomeScreen />
//     </AppWrapper>
//   )
// }

// function AppWrapper({children}) {
//   const [state, useState] = React.useState({})
//   return (
//     <FormContext.Provider value={[state, useState]}>
//       <h1>My awesomely faster app</h1>
//       <p>
//         Type in the input. Because the children elements are consistent between
//         renders, React is able to exit early and not re-rener those
//         unnecessarily (so the data table doesn't get re-rendered which is why
//         this one's faster).
//       </p>
//       <div>{children}</div>
//     </FormContext.Provider>
//   )
// }
