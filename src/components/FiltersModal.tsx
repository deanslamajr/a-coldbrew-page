import { IoMdArrowBack } from 'react-icons/io';

import { Modal } from './Modal';
import { NavButton, NavButtonPositions } from './NavButton';

import { cssTheme } from '../helpers/constants';

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
            color={cssTheme.colors.red}
            size={cssTheme.sizes.navbarButtonIconSize}
          />
        }
      />
    </Modal>
  );
};
