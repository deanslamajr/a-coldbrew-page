import { GiCheckeredFlag } from 'react-icons/gi';
import styled from 'styled-components';
import nl2br from 'react-nl2br';

import { Viewer } from './RichText';
import { Modal } from './Modal';
import { BackButton, NavButton, NavButtonPositions } from './NavButton';
import { breakpoints } from './layouts';

import { useCompleteChore } from '../hooks/useCompleteChore';

import { cssTheme } from '../helpers/constants';
import {
  computeStatus,
  DueStatusEnum,
  getChoreButtonBackgroundColor,
} from '../helpers/dueDates';

import { ChoreInterface } from '../types';

interface ChoreDetailsModalPropsInterface {
  chore: ChoreInterface;
  handleHide: () => void;
}

const ChoreSummaryContainer = styled.div`
  margin: 1rem;
  margin-bottom: 0.25rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};

  ${breakpoints.phoneMax`
    font-size: 1.25rem;
  `}
`;

const ChoreDescriptionContainer = styled.div`
  margin: 1rem;
  text-align: left;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.black};

  ${breakpoints.phoneMax`
    font-size: 1rem;
  `}
`;

interface DueDateContainerProps {
  status: DueStatusEnum;
}

const DueDateContainer = styled.div<DueDateContainerProps>`
  text-align: center;
  color: ${props =>
    getChoreButtonBackgroundColor({
      dueDateStatus: props.status,
      colors: props.theme.colors,
    })};
`;

const ChoreDescription: React.FC<{ chore: ChoreInterface }> = ({ chore }) => {
  return chore.version >= 3 ? (
    <Viewer serializedEditorState={chore.description} />
  ) : (
    <ChoreDescriptionContainer>
      {nl2br(chore.description)}
    </ChoreDescriptionContainer>
  );
};

export const ChoreDetailsModal: React.FC<ChoreDetailsModalPropsInterface> = ({
  chore,
  handleHide,
}) => {
  const completeChore = useCompleteChore();

  const handleCompleteChore = async (): Promise<void> => {
    await completeChore(chore.id);
    handleHide();
  };

  const { status, dueDifferenceCopy } = computeStatus(chore.dueDate);

  return (
    <Modal>
      <div>
        <ChoreSummaryContainer>{chore.summary}</ChoreSummaryContainer>
        <DueDateContainer status={status}>{dueDifferenceCopy}</DueDateContainer>
        <ChoreDescription chore={chore} />
      </div>
      <BackButton
        position={NavButtonPositions.BottomLeft}
        onClick={() => handleHide()}
      />
      <NavButton
        position={NavButtonPositions.BottomRight}
        clickHandler={handleCompleteChore}
        icon={
          <GiCheckeredFlag
            color={cssTheme.colors.green}
            size={cssTheme.sizes.navbarButtonIconSize}
          />
        }
      />
    </Modal>
  );
};
