import styled from 'styled-components';

import { breakpoints } from './layouts';

export const ExampleComponent = styled.div`
  height: 15rem;
  margin: 0 1.5rem;

  ${breakpoints.tabletMax`
    height: 14rem;
  `}
  ${breakpoints.phoneMax`
    margin: 0 .75rem;
  `}
`;
