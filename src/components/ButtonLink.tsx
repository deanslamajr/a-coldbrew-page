import Link from 'next/link';
import styled from 'styled-components';

import { breakpoints } from './layouts';

const StyledLink = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  width: ${({ theme }) => theme.sizes.formFieldWidth};
  text-align: center;
  margin: 0.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.clearGray};
  border-radius: 3px;

  ${breakpoints.phoneMax`
    width: ${props => props.theme.sizes.formFieldWidthMobile};
  `}

  /* visited link */
  a:visited {
    opacity: 1;
  }

  /* mouse over link */
  a:hover {
    opacity: 1;
  }

  /* selected link */
  a:active {
    opacity: 1;
  }

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.clearGray};

    a {
      color: ${props => props.theme.colors.white};
      text-shadow: none;
    }
  }

  &:focus {
    outline: none;
  }
`;

interface Props {
  url: string;
}

export const ButtonLink: React.FC<Props> = ({ url }) => {
  return (
    <Link href={url}>
      <StyledLink tabIndex={0}>
        <a>create new account</a>
      </StyledLink>
    </Link>
  );
};
