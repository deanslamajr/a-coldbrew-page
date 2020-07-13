/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, Field } from 'react-final-form';
import { MdDoneAll } from 'react-icons/md';
import styled from 'styled-components';

import { ConfirmButton, NavButtonPositions } from './NavButton';
import { FormFieldContainer, InvalidFieldMessage } from './Forms';

import { cssTheme } from '../helpers/constants';

interface Props {
  finishAccountCreation: (password: string) => Promise<any>;
}

interface FormFieldsInterface {
  password: string;
  verifyPassword: string;
}

type ValidationErrors = Partial<FormFieldsInterface>;

const initialValues: FormFieldsInterface = {
  password: '',
  verifyPassword: '',
};

const HeaderTextContainer = styled.div`
  padding: 1rem;
  font-size: 1.15rem;
  text-align: center;
`;

const validateForm = (values: FormFieldsInterface): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!values.password || !values.verifyPassword) {
    const requiredError = 'Required';
    if (!values.password) {
      errors.password = requiredError;
    }
    if (!values.verifyPassword) {
      errors.verifyPassword = requiredError;
    }
  } else if (values.password !== values.verifyPassword) {
    errors.verifyPassword = 'Must match';
  }
  return errors;
};

export const AccountCreateFinishForm: React.FC<Props> = ({
  finishAccountCreation,
}) => {
  return (
    <>
      <HeaderTextContainer>
        <div>Finish Account Creation</div>
      </HeaderTextContainer>
      <Form
        onSubmit={values => finishAccountCreation(values.password)}
        initialValues={initialValues}
        validate={validateForm}
        render={({ form, valid }) => (
          <form>
            <div>
              <Field name="password">
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
              <Field name="verifyPassword">
                {({ input, meta }) => (
                  <FormFieldContainer>
                    <label>Verify Password</label>
                    <input
                      {...input}
                      type="password"
                      placeholder="verify password"
                    />
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
