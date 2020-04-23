import styled from 'styled-components';

import { breakpoints } from '../layouts';

export const ChoreButton = styled.button`
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 1rem;
  border: 0.16em solid rgba(255, 255, 255, 0);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  color: ${props => props.theme.colors.background};
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: ${props => props.theme.colors.text};
    opacity: 0.75;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  margin: 5rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
`;
