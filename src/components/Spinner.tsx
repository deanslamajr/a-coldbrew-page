import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 3rem;
  height: 3rem;
  overflow: hidden;
`;

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 50px;
  height: 50px;

  & .path {
    stroke: ${({ theme }) => theme.colors.blue};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

// taken from https://gist.github.com/knowbody/578b35164b69e867ed4913423f6bed30
export const Spinner = () => (
  <Container>
    <StyledSpinner viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
      />
    </StyledSpinner>
  </Container>
);
