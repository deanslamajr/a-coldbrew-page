import styled from 'styled-components';

import { breakpoints } from './layouts';

export const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  align-items: center;

  ${breakpoints.phoneMax`
    margin: 1rem;
    width: 85vw;
  `}

  & input,
  & textarea {
    border: 1px solid ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    width: 30rem;
    outline: none;
    min-height: unset;
    font-family: ${({ theme }) => theme.font};
    font-size: 16px;
    padding: 0.5rem !important;

    ${breakpoints.phoneMax`
      width: 100%;
    `}
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
