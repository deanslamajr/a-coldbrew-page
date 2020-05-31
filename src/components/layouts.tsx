import {
  css,
  createGlobalStyle,
  CSSObject,
  Interpolation,
  InterpolationFunction,
  SimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';

export const limitMobileTouchActions = () => {
  return css`
    touch-action: pan-x pan-y;
  `;
};

export const shadow = () => {
  return css`
    box-shadow: 0 6px 10px 0 #666;
  `;
};

export const enlargenOnHover = () => {
  return css`
    &:hover {
      transform: scale(1.05);
    }
  `;
};

export const shadowEnlargenOnHover = () => {
  return css`
    ${shadow()}
    ${enlargenOnHover()}
    &:hover {
      box-shadow: 0 6px 14px 0 #666;
    }
  `;
};

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
  * {
    ${limitMobileTouchActions()}
  }

  body {
    margin: 0;
    background-color: ${({ theme }) => theme.colors.white};
    overflow-y: overlay;
    overflow-x: hidden;
    font-family: ${({ theme }) => theme.font};
  }

  a {
    color: ${props => props.theme.colors.black};
    text-shadow: 1px 1px ${props => props.theme.colors.blue};
    text-decoration: none;
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

  /* Prevent screen zoom on input focus on mobile */
  input[type="color"],
  input[type="date"],
  input[type="datetime"],
  input[type="datetime-local"],
  input[type="email"],
  input[type="month"],
  input[type="number"],
  input[type="password"],
  input[type="search"],
  input[type="tel"],
  input[type="text"],
  input[type="time"],
  input[type="url"],
  input[type="week"],
  select:focus,
  textarea {
    font-size: 16px;
  }
`;
