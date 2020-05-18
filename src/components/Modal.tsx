import styled, { createGlobalStyle } from 'styled-components';

import { breakpoints, shadow } from './layouts';

export const ModalOverlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.clearBlack};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ScrollPreventionStyles = createGlobalStyle`
  #__next {
    height: 100vh;
    overflow-y: hidden;
    position: fixed;
    width: 100%;
  }
`;

export const ModalBase = styled.div`
  background-color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 75vw;
  min-width: 25vw;
  max-height: 75vh;
  padding: 0.5rem;
  min-height: 50vh;
  overflow: overlay;
  ${shadow()}

  ${breakpoints.phoneMax`
    width: 90vw;
    height: 90vh;
    max-width: none;
    max-height: none;
  `}
`;

export const Modal: React.FC = ({ children }) => {
  return (
    <ModalOverlay>
      <ScrollPreventionStyles />
      <ModalBase>{children}</ModalBase>
    </ModalOverlay>
  );
};
