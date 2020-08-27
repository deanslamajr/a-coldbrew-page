/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';
import * as EmailValidator from 'email-validator';

import { ConfirmButton, NavButtonPositions } from './NavButton';
import {
  BorderlessTextInput,
  FormFieldContainer,
  InvalidFieldMessage,
  SummaryContainer,
} from './Forms';

interface Props {
  captureRecaptchaAndSendEmail: (email: string) => void;
  initialValues: AccountCreateFormFields;
}

export interface AccountCreateFormFields {
  email: string;
  verifyEmail: string;
}

type ValidationErrors = Partial<AccountCreateFormFields>;

const HeaderTextContainer = styled.div`
  padding: 1rem;
  font-size: 1.15rem;
  text-align: center;
`;

const validateForm = (values: AccountCreateFormFields): ValidationErrors => {
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
  } else if (values.email.toLowerCase() !== values.verifyEmail.toLowerCase()) {
    errors.verifyEmail = 'Must match "Email"';
  }
  return errors;
};

export const AccountCreateForm: React.FC<Props> = ({
  captureRecaptchaAndSendEmail,
  initialValues,
}) => {
  return (
    <>
      <HeaderTextContainer>
        <div>Submit a valid email address to which</div>
        <div>we can send a one-time, time-sensitive ‘Create Account’ link</div>
      </HeaderTextContainer>
      <Form
        onSubmit={values =>
          captureRecaptchaAndSendEmail(values.email.toLowerCase())
        }
        initialValues={initialValues}
        validate={validateForm}
        render={({ form, valid }) => (
          <form>
            <div>
              <Field name="email">
                {({ input, meta }) => (
                  <FormFieldContainer>
                    <label>Email</label>
                    <SummaryContainer>
                      <BorderlessTextInput
                        {...input}
                        type="text"
                        placeholder="email"
                      />
                    </SummaryContainer>
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
                    <SummaryContainer>
                      <BorderlessTextInput
                        {...input}
                        type="text"
                        placeholder="email"
                      />
                    </SummaryContainer>
                    <InvalidFieldMessage>
                      {meta.error && meta.touched ? meta.error : ''}
                    </InvalidFieldMessage>
                  </FormFieldContainer>
                )}
              </Field>

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
