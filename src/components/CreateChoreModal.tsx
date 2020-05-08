import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { DateSingleInput } from '@datepicker-react/styled';
import { RiCheckLine } from 'react-icons/ri';
import { IoMdArrowBack } from 'react-icons/io';
import styled from 'styled-components';

import { NavButton, NavButtonPositions } from './NavButton';
import { Modal } from './Modal';

import { theme } from '../theme';

export interface ChoreFormValuesInterface {
  summary: string;
  dueDate: Date;
  description: string;
}

interface ChoreFormPropsInterface {
  handleHideCreateChoreModal: () => void;
  handleSubmit: (values: ChoreFormValuesInterface) => void;
}

interface CreateChoreModalProps {
  handleHideCreateChoreModal: () => void;
  handleSubmit: (values: ChoreFormValuesInterface) => void;
}

const initialValues: ChoreFormValuesInterface = {
  summary: 'some new chore',
  dueDate: new Date(),
  description: '',
};

const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  align-items: center;

  & input,
  & textarea {
    min-height: 46px;
    border: inherit;
  }
`;

const DatePickerStylesOverride = styled.div`
  width: 100%;

  /* override @datepicker-react/styled input styles */
  & label {
    border: inherit;
  }
  /* override @datepicker-react/styled input styles */
  & input {
    padding: 0;
    font-weight: inherit;
  }

  /* override @datepicker-react/styled datapicker styles */
  & > div > div {
    /* Center horizontally and vertically */
    /* @see https://stackoverflow.com/questions/3157372/css-horizontal-centering-of-a-fixed-div#answer-32694476 */
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const ChoreForm: React.FC<ChoreFormPropsInterface> = ({
  handleHideCreateChoreModal,
  handleSubmit,
}) => {
  const [showDueDatePicker, toggleShowDueDatePicker] = useState(false);

  return (
    <Form
      onSubmit={values => handleSubmit(values)}
      initialValues={initialValues}
      render={({ form }) => (
        <form>
          <div>
            <FormFieldContainer>
              <label>Due Date</label>
              <Field name="dueDate">
                {props => {
                  return (
                    <DatePickerStylesOverride>
                      <DateSingleInput
                        onDateChange={data => {
                          if (data.date) {
                            props.input.onChange(data.date);
                          }
                          toggleShowDueDatePicker(false);
                        }}
                        onFocusChange={focusedInput =>
                          toggleShowDueDatePicker(focusedInput)
                        }
                        onClose={() => toggleShowDueDatePicker(false)}
                        date={props.input.value}
                        showDatepicker={showDueDatePicker}
                        showCalendarIcon={false}
                        showResetDate={false}
                      />
                    </DatePickerStylesOverride>
                  );
                }}
              </Field>
            </FormFieldContainer>
            <FormFieldContainer>
              <label>Summary</label>
              <Field
                name="summary"
                component="input"
                type="text"
                placeholder="summary"
              />
            </FormFieldContainer>
            <FormFieldContainer>
              <label>Description</label>
              <Field
                name="description"
                component="textarea"
                type="text"
                placeholder="description"
              />
            </FormFieldContainer>
            {/* Also need a dropdown input that can select a recurring  */}
            {/* None, daily, weekly, monthly, yearly */}
            {/* every setting but 'None' should create an additional input defaulted to 1 */}
            {/* but can set higher numbers e.g. every 1 day OR 2 days OR 3 days etc.*/}

            {!showDueDatePicker && (
              <NavButton
                position={NavButtonPositions.BottomLeft}
                clickHandler={() => handleHideCreateChoreModal()}
                icon={
                  <IoMdArrowBack
                    color={theme.colors.red}
                    size={theme.sizes.navbarButtonIconSize}
                  />
                }
              />
            )}
            {!showDueDatePicker && (
              <NavButton
                position={NavButtonPositions.BottomRight}
                clickHandler={() => form.submit()}
                icon={
                  <RiCheckLine
                    color={theme.colors.green}
                    size={theme.sizes.navbarButtonIconSize}
                  />
                }
              />
            )}
          </div>
        </form>
      )}
    />
  );
};

export const CreateChoreModal: React.FC<CreateChoreModalProps> = ({
  handleHideCreateChoreModal,
  handleSubmit,
}) => {
  return (
    <Modal>
      <ChoreForm
        handleHideCreateChoreModal={handleHideCreateChoreModal}
        handleSubmit={handleSubmit}
      />
    </Modal>
  );
};
