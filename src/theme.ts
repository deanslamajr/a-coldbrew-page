import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    background: 'black',
    text: 'white',
    notYetDue: 'green',
    dueToday: 'yellow',
    overDue: 'red',
  },
  zIndex: {
    highest: 999,
    middle: 0,
    lowest: -999,
  },
};
