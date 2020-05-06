import { RiCloseLine } from 'react-icons/ri';

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
          <RiCloseLine
            color={theme.colors.red}
            size={theme.sizes.navbarButtonIconSize}
          />
        }
      />
    </Modal>
  );
};
