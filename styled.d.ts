// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      clearWhite: string;
      clearBlack: string;
      black: string;
      white: string;
      green: string;
      yellow: string;
      red: string;
      blue: string;
    };
    sizes: {
      navbarButtonIconSize: string;
    };
    zIndex: {
      highest: number;
      middle: number;
      lowest: number;
    };
    font: string;
  }
}
