/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, Field } from 'react-final-form';
import { MdDoneAll } from 'react-icons/md';
import styled from 'styled-components';
import Link from 'next/link';

import { NavButton, NavButtonPositions } from './NavButton';
import { FormFieldContainer, InvalidFieldMessage } from './Forms';
import { breakpoints } from './layouts';
import { KeyAction } from './KeyAction';

import { LoginFormFields } from '../pages/a/login';

import { cssTheme } from '../helpers/constants';

interface Props {
  initialValues: LoginFormFields;
  isFailedLogin: boolean;
  onLogin: (params: LoginFormFields) => Promise<any>;
}

const required = (value: string) => (value ? undefined : 'Required');

const HeaderTextContainer = styled.div`
  padding: 1rem;
  font-size: 1.15rem;
  text-align: center;
`;

const StyledLink = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  width: 30rem;
  text-align: center;
  margin: 0.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.clearGray};
  border-radius: 3px;

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

  ${breakpoints.phoneMax`
    width: 85vw;
  `}
`;

const FooterContainer = styled.div`
  display: block;
  margin-bottom: 2rem;
`;

export const AccountLoginModal: React.FC<Props> = ({
  initialValues,
  isFailedLogin,
  onLogin,
}) => {
  return (
    <>
      <HeaderTextContainer>
        What Coldbrew Page Account will you be using today?
      </HeaderTextContainer>
      {isFailedLogin && (
        <InvalidFieldMessage>
          The email or password are incorrect!
        </InvalidFieldMessage>
      )}
      <Form
        onSubmit={values => onLogin(values)}
        initialValues={initialValues}
        render={({ form, valid }) => (
          <form>
            <div>
              <Field name="email" validate={required}>
                {({ input, meta }) => (
                  <FormFieldContainer>
                    <label>Email</label>
                    <input {...input} type="text" placeholder="email" />
                    <InvalidFieldMessage>
                      {meta.error && meta.touched ? meta.error : ''}
                    </InvalidFieldMessage>
                  </FormFieldContainer>
                )}
              </Field>
              <Field name="password" validate={required}>
                {({ input, meta }) => (
                  <FormFieldContainer>
                    <label>Password</label>
                    <input {...input} type="password" placeholder="password" />
                    <InvalidFieldMessage>
                      {meta.error && meta.touched ? meta.error : ''}
                    </InvalidFieldMessage>
                  </FormFieldContainer>
                )}
              </Field>

              {valid && (
                <>
                  <NavButton
                    position={NavButtonPositions.BottomRight}
                    clickHandler={() => form.submit()}
                    icon={
                      <MdDoneAll
                        color={cssTheme.colors.green}
                        size={cssTheme.sizes.navbarButtonIconSize}
                      />
                    }
                  />
                  <KeyAction
                    keys={['Enter']}
                    onKeyPress={() => form.submit()}
                  />
                </>
              )}
            </div>
          </form>
        )}
      />
      <FooterContainer>
        <Link href="/a/new">
          <StyledLink tabIndex="0">
            <a>create new account</a>
          </StyledLink>
        </Link>
        <StyledLink tabIndex="0">
          <a>remain anonymous</a>
        </StyledLink>
      </FooterContainer>
    </>
  );
};
