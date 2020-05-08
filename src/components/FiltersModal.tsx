import { IoMdArrowBack } from 'react-icons/io';

import { Modal } from './Modal';
import { NavButton, NavButtonPositions } from './NavButton';

import { theme } from '../theme';

interface FiltersModalPropsInterface {
  closeFiltersModal: () => void;
}

export const FiltersModal: React.FC<FiltersModalPropsInterface> = ({
  closeFiltersModal,
}) => {
  return (
    <Modal>
      filters!
      <NavButton
        position={NavButtonPositions.BottomLeft}
        clickHandler={() => closeFiltersModal()}
        icon={
          <IoMdArrowBack
            color={theme.colors.red}
            size={theme.sizes.navbarButtonIconSize}
          />
        }
      />
    </Modal>
  );
};
