import {
  css,
  createGlobalStyle,
  CSSObject,
  Interpolation,
  InterpolationFunction,
  SimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';

const tabletMax = <T extends {}>(
  cssRules:
    | CSSObject
    | TemplateStringsArray
    | InterpolationFunction<ThemedStyledProps<T, {}>>,
  ...interpolations:
    | SimpleInterpolation[]
    | Array<Interpolation<ThemedStyledProps<T, {}>>>
) => css`
  @media (max-width: 899px) {
    ${css(cssRules, ...interpolations)}
  }
`;

const phoneMax = <T extends {}>(
  cssRules:
    | CSSObject
    | TemplateStringsArray
    | InterpolationFunction<ThemedStyledProps<T, {}>>,
  ...interpolations:
    | SimpleInterpolation[]
    | Array<Interpolation<ThemedStyledProps<T, {}>>>
) => css`
  @media (max-width: 599px) {
    ${css(cssRules, ...interpolations)}
  }
`;

export const breakpoints = {
  tabletMax,
  phoneMax,
};

export const GlobalStyles = createGlobalStyle`
    body {
      margin: 0;
      background-color: ${props => props.theme.colors.black};
      overflow-y: overlay;
      overflow-x: hidden;
    }

    a {
      color: ${props => props.theme.colors.white};
    }

    /* visited link */
    a:visited {
      opacity: .75;
    }

    /* mouse over link */
    a:hover {
      opacity: .75;
    }

    /* selected link */
    a:active {
      opacity: .5;
    }
`;
