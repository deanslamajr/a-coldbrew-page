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
  display: grid;
  place-items: center;

  background-color: ${props => props.theme.colors.white};
  min-width: 35vw;
  max-width: 75vw;
  min-height: 50vh;
  max-height: 75vh;
  padding: 0.5rem;
  overflow: auto;
  ${shadow()}

  ${breakpoints.phoneMax`
    width: 100vw;
    max-width: none;
    min-height: 25vh;
    max-height: none;
  `}
`;

const ModalBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: min-content;
`;

export const Modal: React.FC = ({ children }) => {
  return (
    <ModalOverlay>
      <ScrollPreventionStyles />
      <ModalBase>
        <ModalBlock>{children}</ModalBlock>
      </ModalBase>
    </ModalOverlay>
  );
};
