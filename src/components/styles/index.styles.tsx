import styled, { DefaultTheme } from 'styled-components';

import { DueStatusEnum } from '../../pages/index';

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
      return colors.notYetDue;
    case DueStatusEnum.DueToday:
      return colors.dueToday;
    case DueStatusEnum.OverDue:
      return colors.overDue;
    default:
      return colors.text;
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
  font-weight: 300;
  background-color: ${props =>
    getChoreButtonBackgroundColor({
      dueDateStatus: props.dueStatus,
      colors: props.theme.colors,
    })};
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
  top: -10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
