import styled from 'styled-components';

import { breakpoints, formFieldStyles, formFieldBorder } from './layouts';

export const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 2rem;
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

export const BorderlessTextInput = styled.input`
  border: none;

  &:focus {
    outline: none;
  }
`;

export const SummaryContainer = styled.div`
  ${formFieldStyles()}
  ${formFieldBorder()}
  padding: 0 0.5rem 0 !important;
`;
