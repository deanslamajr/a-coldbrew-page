/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from 'react';
import { Form, Field } from 'react-final-form';
import { IoMdArrowBack } from 'react-icons/io';
import { MdDoneAll } from 'react-icons/md';
import styled from 'styled-components';
import * as EmailValidator from 'email-validator';
import getConfig from 'next/config';

import { NavButton, NavButtonPositions } from './NavButton';
import { Modal } from './Modal';
import { FormFieldContainer, InvalidFieldMessage } from './Forms';

import { RecaptchaV3Context } from '../contexts/RecaptchaV3Context';

import { cssTheme, CAPTCHA_ACTION_CREATE_ACCOUNT } from '../helpers/constants';

import { useSendAccountCreateEmailMutation } from '../graphql/mutations/sendAccountCreateEmail.graphql';

const { publicRuntimeConfig } = getConfig();

interface ModalPropsInterface {
  handleBackClick: () => void;
}

interface FormFieldsInterface {
  email: string;
  verifyEmail: string;
}

type ValidationErrors = Partial<FormFieldsInterface>;

const initialValues: FormFieldsInterface = {
  email: '',
  verifyEmail: '',
};

const HeaderTextContainer = styled.div`
  padding: 1rem;
  font-size: 1.15rem;
  text-align: center;
`;

const validateForm = (values: FormFieldsInterface): ValidationErrors => {
  const errors: ValidationErrors = {};

  const emailIsValidEmail = EmailValidator.validate(values.email);
  const verifyEmailIsValidEmail = EmailValidator.validate(values.verifyEmail);

  if (
    !values.email ||
    !values.verifyEmail ||
    !emailIsValidEmail ||
    !verifyEmailIsValidEmail
  ) {
    const requiredError = 'Required';
    const mustBeValidEmailError = 'Must be a valid email address';
    if (!values.email) {
      errors.email = requiredError;
    } else if (!emailIsValidEmail) {
      errors.email = mustBeValidEmailError;
    }
    if (!values.verifyEmail) {
      errors.verifyEmail = requiredError;
    } else if (!verifyEmailIsValidEmail) {
      errors.verifyEmail = mustBeValidEmailError;
    }
  } else if (values.email !== values.verifyEmail) {
    errors.verifyEmail = 'Must match "Email"';
  }
  return errors;
};

export const AccountCreateModal: React.FC<ModalPropsInterface> = ({
  handleBackClick,
}) => {
  const recaptchaV3Instance = useContext(RecaptchaV3Context);
  const [sendAccountCreateEmail] = useSendAccountCreateEmailMutation();

  const checkRecaptchaV3Status = (): Promise<string> => {
    if (!publicRuntimeConfig.RECAPTCHA_V3_SITE) {
      return Promise.resolve('');
    }

    if (!recaptchaV3Instance) {
      return Promise.reject('recaptcha instance does not exist!');
    }

    return recaptchaV3Instance.execute(CAPTCHA_ACTION_CREATE_ACCOUNT);
  };

  const captureRecaptchaAndSendEmail = async (email: string): Promise<any> => {
    // setSubmittedEmail(email);
    try {
      const recaptchaV3Response = await checkRecaptchaV3Status();

      const mutationResponse = await sendAccountCreateEmail({
        variables: {
          input: {
            email,
            recaptchaV3Response,
          },
        },
      });

      console.log('mutationResponse', mutationResponse);
    } catch (error) {
      console.log('captureRecaptchaAndSendEmail, error', error);
    }
  };

  return (
    <Modal>
      <HeaderTextContainer>
        <div>Submit a valid email address to which</div>
        <div>we can send a one-time, time-sensitive ‘Create Account’ link</div>
      </HeaderTextContainer>
      <Form
        onSubmit={values => captureRecaptchaAndSendEmail(values.email)}
        initialValues={initialValues}
        validate={validateForm}
        render={({ form, valid }) => (
          <form>
            <div>
              <Field name="email">
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
              <Field name="verifyEmail">
                {({ input, meta }) => (
                  <FormFieldContainer>
                    <label>Verify Email</label>
                    <input {...input} type="text" placeholder="email" />
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
      {/* TODO: <RecaptchaV2
        show={false}
        onPass={()=>{}}
        onFail={()=>{}}
      /> */}
    </Modal>
  );
};
