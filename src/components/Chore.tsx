import React from 'react';

import { ChoreButton, ChoreButtonDueDate } from './styles/index.styles';
import { DueDateInterface } from '../types';
import { computeStatus } from '../helpers/dueDates';

interface ChoreProps {
  dueDate: DueDateInterface;
  name: string;
  clickHandler: () => void;
}

export const Chore: React.FC<ChoreProps> = ({
  clickHandler,
  dueDate,
  name,
}) => {
  const { status, dueDifferenceCopy } = computeStatus(dueDate);

  return (
    <ChoreButton dueStatus={status} onClick={clickHandler}>
      {name}
      <br />
      <ChoreButtonDueDate>{dueDifferenceCopy}</ChoreButtonDueDate>
    </ChoreButton>
  );
};
