import styled, { DefaultTheme, StyledComponent } from 'styled-components';

import { breakpoints } from './layouts';

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
  buttonText: string;
}

const Button = styled.div`
  border: 1px solid ${props => props.theme.colors.background};
  background-color: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.background};
  cursor: pointer;
  z-index: ${props => props.theme.zIndex.highest};
  border-radius: 5rem;
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

  &:hover {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }

  ${breakpoints.phoneMax`
    margin: 3px;
  `}
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
    // case TOP_RIGHT:
    //   button = TopRightButton
    //   break
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
}

export const NavButton: React.FC<NavButtonProps> = ({
  position,
  clickHandler,
  buttonText,
}) => {
  const PositionedButton = getButtonByPosition(position);

  return (
    <PositionedButton onClick={clickHandler}>{buttonText}</PositionedButton>
  );
};
