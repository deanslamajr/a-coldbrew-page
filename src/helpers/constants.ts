import { DefaultTheme } from 'styled-components';

export const cssTheme: DefaultTheme = {
  colors: {
    clearWhite: 'rgba(254, 253, 239, 0.5)',
    clearBlack: 'rgba(12, 9, 13, 0.5)',
    clearGray: 'rgba(96, 123, 125, 0.5)',
    black: 'rgba(12, 9, 13, 1)',
    white: 'rgba(254, 253, 239, 1)',
    gray: 'rgba(96, 123, 125, 1)',
    green: 'rgba(41, 191, 18, 1)',
    yellow: 'rgba(255, 153, 20, 1)',
    red: 'rgba(241, 80, 37, 1)',
    blue: 'rgba(105, 255, 241, 1)',
  },
  sizes: {
    navbarButtonIconSize: '2rem',
    errorIcon: '5rem',
    formFieldWidth: '20rem',
    formFieldWidthMobile: '85vw',
  },
  zIndex: {
    highest: 999,
    middle: 0,
    lowest: -999,
  },
  font: `'Roboto', sans-serif`,
};

// 2 -> 3
// * added slatejs serializing/deserializing logic
export const choreVersion = 3;

export const RECAPTCHA_ACTION_CREATE_ACCOUNT =
  'RECAPTCHA_ACTION_CREATE_ACCOUNT';
export const RECAPTCHA_THRESHOLD = 0.5;
