/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, Field } from 'react-final-form';
import { MdDoneAll } from 'react-icons/md';
import styled from 'styled-components';
import Link from 'next/link';

import { NavButton, NavButtonPositions } from './NavButton';
import { FormFieldContainer, InvalidFieldMessage } from './Forms';

import { cssTheme } from '../helpers/constants';

interface Props {
  isFailedLogin: boolean;
  onLogin: (params: FormFieldsInterface) => Promise<any>;
}

export interface FormFieldsInterface {
  email: string;
  password: string;
}

const initialValues: FormFieldsInterface = {
  email: '',
  password: '',
};

const required = (value: string) => (value ? undefined : 'Required');

const HeaderTextContainer = styled.div`
  padding: 1rem;
  font-size: 1.15rem;
  text-align: center;
`;

const StyledLink = styled.div`
  padding: 0.5rem;
  cursor: pointer;
`;

const FooterContainer = styled.div`
  display: block;
  margin-bottom: 2rem;
`;

export const AccountLoginModal: React.FC<Props> = ({
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
              )}
            </div>
          </form>
        )}
      />
      <FooterContainer>
        <StyledLink>
          <Link href="/a/new">
            <a>create new account</a>
          </Link>
        </StyledLink>
        <StyledLink>
          <a>remain anonymous</a>
        </StyledLink>
      </FooterContainer>
    </>
  );
};
