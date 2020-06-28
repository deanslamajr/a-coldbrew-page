/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, Field } from 'react-final-form';
import { IoMdArrowBack } from 'react-icons/io';
import { MdDoneAll } from 'react-icons/md';
import styled from 'styled-components';
import Link from 'next/link';

import { NavButton, NavButtonPositions } from './NavButton';
import { Modal } from './Modal';
import { FormFieldContainer, InvalidFieldMessage } from './Forms';

import { cssTheme } from '../helpers/constants';

import { useLoginAccountMutation } from '../graphql-client/mutations/loginAccount.graphql';

interface ModalPropsInterface {
  handleBackClick: () => void;
}

interface FormFieldsInterface {
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

export const AccountLoginModal: React.FC<ModalPropsInterface> = ({
  handleBackClick,
}) => {
  const [loginAccount, { data, error, loading }] = useLoginAccountMutation();

  const login = async ({
    email,
    password,
  }: FormFieldsInterface): Promise<any> => {
    try {
      const mutationResponse = await loginAccount({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      console.log('mutationResponse', mutationResponse);
    } catch (error) {
      console.log('finishAccountCreation, error', error);
    }
  };

  return (
    <Modal>
      <HeaderTextContainer>
        What Coldbrew Page Account will you be using today?
      </HeaderTextContainer>
      <Form
        onSubmit={values => login(values)}
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
                position={NavButtonPositions.BottomLeft}
                clickHandler={() => handleBackClick()}
                icon={
                  <IoMdArrowBack
                    color={cssTheme.colors.red}
                    size={cssTheme.sizes.navbarButtonIconSize}
                  />
                }
              />

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
    </Modal>
  );
};
