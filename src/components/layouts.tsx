import {
  css,
  createGlobalStyle,
  CSSObject,
  DefaultTheme,
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

export const viewerStyles = () => {
  return css`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    outline: none;
    min-height: unset;
    font-family: ${({ theme }) => theme.font};
    font-size: 16px;
    padding: 0.5rem !important;
    word-break: break-word;
  `;
};

export const formFieldBorder = () => {
  return css`
    border: 1px solid ${({ theme }) => theme.colors.black};
    outline: none;
  `;
};

export const formFieldStyles = () => {
  return css`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    width: ${({ theme }) => theme.sizes.formFieldWidth};
    min-height: unset;
    font-family: ${({ theme }) => theme.font};
    font-size: 16px;
    padding: 0.5rem 0 !important;

    ${breakpoints.phoneMax`
      width: 100%;
    `}
  `;
};

const tabletMax = <T extends {}>(
  cssRules:
    | CSSObject
    | TemplateStringsArray
    | InterpolationFunction<ThemedStyledProps<T, DefaultTheme>>,
  ...interpolations:
    | SimpleInterpolation[]
    | Array<Interpolation<ThemedStyledProps<T, DefaultTheme>>>
) => css`
  @media (max-width: 899px) {
    ${css(cssRules, ...interpolations)}
  }
`;

const phoneMax = <T extends {}>(
  cssRules:
    | CSSObject
    | TemplateStringsArray
    | InterpolationFunction<ThemedStyledProps<T, DefaultTheme>>,
  ...interpolations:
    | SimpleInterpolation[]
    | Array<Interpolation<ThemedStyledProps<T, DefaultTheme>>>
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
