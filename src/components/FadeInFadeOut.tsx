import Transition, {
  TransitionStatus,
} from 'react-transition-group/Transition';
import styled from 'styled-components';

interface FadePropsInterface {
  state: TransitionStatus;
}

interface FadeInFadeOutPropsInterface {
  show: boolean;
  timeout?: number;
}

const Fade = styled.div<FadePropsInterface>`
  transition: 0.5s;
  opacity: ${({ state }) => (state === 'entered' ? 1 : 0)};
`;

export const FadeInFadeOut: React.FC<FadeInFadeOutPropsInterface> = ({
  children,
  show,
  timeout = 5000,
}) => (
  <Transition in={show} timeout={timeout} unmountOnExit mountOnEnter>
    {state => <Fade state={state}>{children}</Fade>}
  </Transition>
);
