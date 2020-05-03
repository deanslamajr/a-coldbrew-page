import styled, { DefaultTheme } from 'styled-components';

import { DueStatusEnum } from '../../pages/index';

import { limitMobileTouchActions, shadow, shadowEnlargenOnHover } from '../layouts';

interface ChoreButtonProps {
  dueStatus: DueStatusEnum | null;
}

interface GetChoreButtonBackgroundColorInterface {
  dueDateStatus: DueStatusEnum | null;
  colors: DefaultTheme['colors'];
}

const getChoreButtonBackgroundColor = ({
  dueDateStatus,
  colors,
}: GetChoreButtonBackgroundColorInterface): string => {
  switch (dueDateStatus) {
    case DueStatusEnum.NotYetDue:
      return colors.green;
    case DueStatusEnum.DueToday:
      return colors.yellow;
    case DueStatusEnum.OverDue:
      return colors.red;
    default:
      return colors.white;
  }
};

export const ChoreButton = styled.button<ChoreButtonProps>`
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 1rem;
  border: 0.16em solid rgba(255, 255, 255, 0);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 200;
  font-size: 1.15rem;
  background-color: ${props =>
    getChoreButtonBackgroundColor({
      dueDateStatus: props.dueStatus,
      colors: props.theme.colors,
    })};
  color: ${props => props.theme.colors.black};
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  outline: none;

  ${shadowEnlargenOnHover()}
`;

export const FlexContainer = styled.div`
  display: flex;
  margin: 5rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const FloatingMenu = styled.div`
  position: fixed;
  bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.clearWhite};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  
  ${limitMobileTouchActions()}
`;

export const Modal = styled.div`
  background-color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  flex-direction: column;

  ${shadow()}
`;
