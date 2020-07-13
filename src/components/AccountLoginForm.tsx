/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { FaUserPlus } from 'react-icons/fa';

import { ConfirmButton, NavButton, NavButtonPositions } from './NavButton';
import { FormFieldContainer, InvalidFieldMessage } from './Forms';

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

export const AccountLoginForm: React.FC<Props> = ({
  initialValues,
  isFailedLogin,
  onLogin,
}) => {
  const router = useRouter();

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

              <NavButton
                position={NavButtonPositions.TopRight}
                clickHandler={() => router.push('/a/new')}
                icon={
                  <FaUserPlus
                    color={cssTheme.colors.green}
                    size={cssTheme.sizes.navbarButtonIconSize}
                  />
                }
              />

              {valid && (
                <ConfirmButton
                  position={NavButtonPositions.BottomRight}
                  onClick={() => form.submit()}
                />
              )}
            </div>
          </form>
        )}
      />
    </>
  );
};
