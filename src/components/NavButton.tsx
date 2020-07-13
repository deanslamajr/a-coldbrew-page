import styled, { DefaultTheme, StyledComponent } from 'styled-components';
import { MdDoneAll } from 'react-icons/md';
import { IoMdArrowBack } from 'react-icons/io';
import useKey from '@rooks/use-key';

import { shadowEnlargenOnHover } from './layouts';

import { cssTheme } from '../helpers/constants';

export enum NavButtonPositions {
  TopLeft = 'TOP_LEFT',
  TopCenter = 'TOP_CENTER',
  TopRight = 'TOP_RIGHT',
  BottomLeft = 'BOTTOM_LEFT',
  BottomCenter = 'BOTTOM_CENTER',
  BottomRight = 'BOTTOM_RIGHT',
}

interface NavButtonProps {
  position: NavButtonPositions;
  clickHandler: () => void;
  buttonText?: string;
  icon?: JSX.Element;
}

const Button = styled.div`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
  cursor: pointer;
  z-index: ${props => props.theme.zIndex.highest};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 0.9rem;
  text-align: center;
  user-select: none;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;

  ${shadowEnlargenOnHover()}
`;

const TopRightButton = styled(Button)`
  top: 0;
  right: 0;
`;

const BottomLeftButton = styled(Button)`
  bottom: 0;
  left: 0;
`;

const BottomRightButton = styled(Button)`
  bottom: 0;
  right: 0;
`;

const getButtonByPosition = (
  position: NavButtonPositions
): StyledComponent<'div', DefaultTheme, {}, never> => {
  let button: ReturnType<typeof getButtonByPosition>;

  switch (position) {
    // case TOP_CENTER:
    //   button = TopCenterButton
    //   break
    // case TOP_CENTER:
    //   button = TopCenterButton
    //   break
    case NavButtonPositions.TopRight:
      button = TopRightButton;
      break;
    case NavButtonPositions.BottomLeft:
      button = BottomLeftButton;
      break;
    // case BOTTOM_CENTER:
    //   button = BottomCenterButton
    //   break
    case NavButtonPositions.BottomRight:
      button = BottomRightButton;
      break;
    default:
      button = Button;
  }

  return button;
};

interface ButtonProps {
  onClick: () => void;
  position: NavButtonPositions;
}

export const ConfirmButton: React.FC<ButtonProps> = ({ onClick, position }) => {
  useKey(['Enter'], onClick);

  return (
    <NavButton
      position={position}
      clickHandler={onClick}
      icon={
        <MdDoneAll
          color={cssTheme.colors.green}
          size={cssTheme.sizes.navbarButtonIconSize}
        />
      }
    />
  );
};

export const BackButton: React.FC<ButtonProps> = ({ onClick, position }) => {
  useKey(['Escape'], onClick);

  return (
    <NavButton
      position={position}
      clickHandler={onClick}
      icon={
        <IoMdArrowBack
          color={cssTheme.colors.black}
          size={cssTheme.sizes.navbarButtonIconSize}
        />
      }
    />
  );
};

export const NavButton: React.FC<NavButtonProps> = ({
  position,
  clickHandler,
  buttonText,
  icon,
}) => {
  const PositionedButton = getButtonByPosition(position);

  return (
    <PositionedButton onClick={clickHandler}>
      {buttonText || icon}
    </PositionedButton>
  );
};
