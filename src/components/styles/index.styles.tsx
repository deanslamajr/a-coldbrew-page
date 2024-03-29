import styled from 'styled-components';

import {
  DueStatusEnum,
  getChoreButtonBackgroundColor,
} from '../../helpers/dueDates';

import { breakpoints, shadowEnlargenOnHover } from '../layouts';

interface ChoreButtonProps {
  dueStatus: DueStatusEnum | null;
}

export const ChoreButton = styled.button<ChoreButtonProps>`
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 1rem;
  border: 0.16em solid rgba(255, 255, 255, 0);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: ${({ theme }) => theme.font};
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

export const ChoreButtonDueDate = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.clearBlack};
`;

export const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  ${breakpoints.phoneMax`
    margin-top: 1rem;
  `}
`;
