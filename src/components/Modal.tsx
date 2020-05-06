import styled from 'styled-components';

import { shadow } from './layouts';

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

export const ModalBase = styled.div`
  background-color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  flex-direction: column;
  ${shadow()}
`;

export const Modal: React.FC = ({ children }) => {
  return (
    <ModalOverlay>
      <ModalBase>{children}</ModalBase>
    </ModalOverlay>
  );
};
