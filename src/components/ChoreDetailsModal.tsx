import { IoMdArrowBack } from 'react-icons/io';
import { GiCheckeredFlag } from 'react-icons/gi';
import styled from 'styled-components';
import nl2br from 'react-nl2br';

import { Modal } from './Modal';
import { NavButton, NavButtonPositions } from './NavButton';
import { breakpoints } from './layouts';

import { cssTheme } from '../helpers/constants';

import { ChoreInterface } from '../types';

interface ChoreDetailsModalPropsInterface {
  chore: ChoreInterface;
  handleHide: () => void;
  handleCompleteChore: () => void;
}

const ChoreSummaryContainer = styled.div`
  margin: 1rem;
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

export const ChoreDetailsModal: React.FC<ChoreDetailsModalPropsInterface> = ({
  chore,
  handleHide,
  handleCompleteChore,
}) => {
  return (
    <Modal>
      <div>
        <ChoreSummaryContainer>{chore.name}</ChoreSummaryContainer>
        <ChoreDescriptionContainer>
          {nl2br(chore.description)}
        </ChoreDescriptionContainer>
      </div>
      <NavButton
        position={NavButtonPositions.BottomLeft}
        clickHandler={() => handleHide()}
        icon={
          <IoMdArrowBack
            color={cssTheme.colors.red}
            size={cssTheme.sizes.navbarButtonIconSize}
          />
        }
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
