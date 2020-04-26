// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      notYetDue: string;
      dueToday: string;
      overDue: string;
    };
    zIndex: {
      highest: number;
      middle: number;
      lowest: number;
    };
  }
}
