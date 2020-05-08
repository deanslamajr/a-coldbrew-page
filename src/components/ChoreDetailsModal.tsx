import { IoMdArrowBack } from 'react-icons/io';
import { GiCheckeredFlag } from 'react-icons/gi';

import { Modal } from './Modal';
import { NavButton, NavButtonPositions } from './NavButton';

import { theme } from '../theme';

import { ChoreInterface } from '../types';

interface ChoreDetailsModalPropsInterface {
  chore: ChoreInterface;
  handleHide: () => void;
  handleCompleteChore: () => void;
}

export const ChoreDetailsModal: React.FC<ChoreDetailsModalPropsInterface> = ({
  chore,
  handleHide,
  handleCompleteChore,
}) => {
  return (
    <Modal>
      {chore && JSON.stringify(chore)}
      <NavButton
        position={NavButtonPositions.BottomLeft}
        clickHandler={() => handleHide()}
        icon={
          <IoMdArrowBack
            color={theme.colors.red}
            size={theme.sizes.navbarButtonIconSize}
          />
        }
      />
      <NavButton
        position={NavButtonPositions.BottomRight}
        clickHandler={handleCompleteChore}
        icon={
          <GiCheckeredFlag
            color={theme.colors.green}
            size={theme.sizes.navbarButtonIconSize}
          />
        }
      />
    </Modal>
  );
};
