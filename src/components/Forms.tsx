import styled from 'styled-components';

import { breakpoints, formFieldStyles } from './layouts';

export const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  align-items: center;

  ${breakpoints.phoneMax`
    margin: 1rem;
    width: ${props => props.theme.sizes.formFieldWidthMobile};
  `}

  & input,
  & textarea {
    ${formFieldStyles()}
  }

  & input {
    height: unset;
  }

  & textarea {
    height: 7rem;
    resize: none;
  }
`;

export const InvalidFieldMessage = styled.div`
  color: ${({ theme }) => theme.colors.red};
  height: 1rem;
  padding: 0.15rem;
`;
